import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public loading = false;

	public passwordVisible = false;

	public validateForm: FormGroup;

	constructor(private fb: FormBuilder, private router: Router,
		private notification: NzNotificationService,
		private cookieService: CookieService,
		private authService: AuthenticationService
	) {

		let isLoggedIn;
		this.authService.isLoggedIn().subscribe(
			(data) => {
				isLoggedIn = data;
			}
		);
		if (isLoggedIn) {
			this.router.navigateByUrl('welcome');
		}
	}

	ngOnInit(): void {
		this.validateForm = this.fb.group({
			userName: [null, [Validators.required]],
			password: [null, [Validators.required]]
		});

	}

	get f() { return this.validateForm.controls; }

	private showNotification(type: string, title: string, msg: string): void {
		this.notification.create(
			type,
			title,
			msg
		);
	}

	public submitForm() {
		for (const i in this.f) {
			this.f[i].markAsDirty();
			this.f[i].updateValueAndValidity();
		}
		if (this.validateForm.invalid) {
			return;
		}
		const params = {
			'email': this.f.userName.value,
			'password': this.f.password.value
		}
		const data = localStorage.getItem('userDetails');
		if (!data) {
			this.showNotification('error', 'Login failed', 'Please enter valid email and password.');
			return;
		}
		const users = JSON.parse(data);
		const loggedinUser = users.find(user => user.email === params['email'] && user.password === params['password']);
		this.loading = true;
		setTimeout(() => {
			if (loggedinUser) {
				this.authService.loggedInStatus.next(true);
				this.cookieService.set('token', loggedinUser['id'].toString());
				this.showNotification('success', 'Login successfully!', 'User has been loggedin successfully.');
				this.router.navigateByUrl('welcome');
			} else {
				this.showNotification('error', 'Login failed', 'Please enter valid email and password.');
			}
			this.loading = false;
		}, 2000);

	}

}
