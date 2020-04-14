import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

	public listOfDisplayData: Array<{}> = [];

	public loading: boolean = false;

	constructor(private cookieService: CookieService, private notification: NzNotificationService) { }

	ngOnInit(): void {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
			const data = localStorage.getItem('userDetails');
			if (data) {
				const users = JSON.parse(data);
				this.avoidLoggedInUser(users);
			}
		}, 2000);
	}

	private avoidLoggedInUser(users: Array<{}>): void {
		const loggedInUser = this.cookieService.get('token');
		const allUsers = users.filter(user => user['id'] !== Number(loggedInUser));
		this.listOfDisplayData = [
			...allUsers
		];
	}

	private showNotification(type: string, title: string, msg: string): void {
		this.notification.create(
			type,
			title,
			msg
		);
	}

	confirm(id: number): void {
		const data = localStorage.getItem('userDetails');
		if (data) {
			const users = JSON.parse(data);
			const index = users.findIndex(user => Number(user['id']) === id);
			users.splice(index, 1);
			this.avoidLoggedInUser(users);
			localStorage.removeItem('userDetails');
			localStorage.setItem('userDetails', JSON.stringify(users));
			this.showNotification('success', 'Removed', 'User has been removed successfully!');
		}
	}

}
