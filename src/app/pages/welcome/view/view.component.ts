import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadFile, NzNotificationService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { CommonService } from 'src/app/_service/common.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

	private id: number | string;

	public userDetails: {} = {};

	public loading: boolean = false;

	public avatarUrl: string;

	public showUploadList: {} = {
		showPreviewIcon: true,
		showRemoveIcon: true,
		hidePreviewIconInNonImage: true
	};

	public fileList: Array<{}> = [];

	public previewImage: string | undefined = '';

	public previewVisible: boolean = false;

	constructor(private activeRoute: ActivatedRoute,
		private notification: NzNotificationService,
		private commonService: CommonService,
		private cookieService: CookieService) { }


	ngOnInit(): void {
		this.id = this.activeRoute.snapshot.paramMap.get('id');
		const data = localStorage.getItem('userDetails');
		if (data) {
			const users = JSON.parse(data);
			const user = users.filter(usr => Number(usr['id']) === Number(this.id));
			if (user && user.length) {
				this.userDetails = user[0];
				this.fileList = [...user[0]['imgs']];
			} else {
				this.showNotification('error', 'User not found', 'ID not found please try again with another ID');
			}
		}
	}

	private showNotification(type: string, title: string, msg: string): void {
		this.notification.create(
			type,
			title,
			msg
		);
	}

	handlePreview = (file: UploadFile) => {
		this.previewImage = file.url || file.thumbUrl;
		this.previewVisible = true;
	};

	nzRemove = (file: UploadFile) => {
		let index;
		if (file.hasOwnProperty('lastModified')) {
			index = this.fileList.findIndex(fileObj => fileObj['lastModified'] === file['lastModified'] );
		} else {
			index = this.fileList.findIndex(fileObj => Number(fileObj['uid']) === Number(file['uid']));
		}
		this.fileList.splice(index, 1);
		const data = localStorage.getItem('userDetails');
		if (data) {
			const users = JSON.parse(data);
			const activeUser = users.find(user => Number(user['id']) === Number(this.id));
			const index = users.findIndex(user => Number(user['id']) === Number(this.id));
			activeUser['imgs'] = this.fileList;
			users.splice(index, 1);
			users.push(activeUser);
			localStorage.removeItem('userDetails');
			localStorage.setItem('userDetails', JSON.stringify(users));
		}
	};

	beforeUpload = (file: File) => {
		return new Observable((observer: Observer<boolean>) => {
			const isJPG = file.type === 'image/jpeg';
			if (!isJPG) {
				this.showNotification('error', 'Error', 'You can only upload JPG file!');
				observer.complete();
				return;
			}
			const isLt1M = file.size / 1024 / 1024 < 1;
			if (!isLt1M) {
				this.showNotification('error', 'Error', 'Image must smaller than 1MB!');
				observer.complete();
				return;
			}
			observer.next(isJPG && isLt1M);
			observer.complete();
		});
	};

	private getBase64(img: File, callback: (img: string) => void): void {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result!.toString()));
		reader.readAsDataURL(img);
	}

	private handleDoneAndError(info): void {
		this.getBase64(info.file!.originFileObj!, (img: string) => {
			this.loading = false;
			this.avatarUrl = img;
			const id = Math.floor((Math.random() * 100) + 1);
			const image = {
				uid: id,
				name: `${id}xxx.png`,
				status: 'done',
				url: img
			};
			const data = localStorage.getItem('userDetails');
			if (data) {
				const users = JSON.parse(data);
				const activeUser = users.find(user => Number(user['id']) === Number(this.id));
				const index = users.findIndex(user => Number(user['id']) === Number(this.id));
				activeUser['imgs'].push(image);
				users.splice(index, 1);
				users.push(activeUser);
				localStorage.removeItem('userDetails');
				localStorage.setItem('userDetails', JSON.stringify(users));
				const token = this.cookieService.get('token'); 
				if (token && Number(token) === Number(this.id)) {
					this.commonService.setEvent('imgSrc', img);
				}
				this.showNotification('success', 'Image uploaded.', 'Image uploaded successfully');
			}
		});
	}

	handleChange(info: { file: UploadFile }): void {
		switch (info.file.status) {
			case 'uploading':
				this.loading = true;
				break;
			case 'done':
				this.handleDoneAndError(info);
				break;
			case 'error':
				this.handleDoneAndError(info);
				this.loading = false;
				break;
		}
	}

}
