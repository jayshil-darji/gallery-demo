import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidator } from 'src/app/_common/custom-validators';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	public validateForm: FormGroup;

	public validation_messages = {
		'firstName': [
			{ type: 'required', message: 'Please enter name!' },
			{ type: 'maxlength', message: 'Name should not be more than 15 characters long' },
			{ type: 'whitespace', message: 'Please enter valid name!' },
			{ type: 'quotes', message: 'Please enter valid name!' },
			{ type: 'invalidString', message: 'Special characters not allowed' }

		],
		'emailID': [
			{ type: 'required', message: 'Please enter email!' },
			{ type: 'invalidEmail', message: 'Please enter valid email id!' },
			{ type: 'whitespace', message: 'Please enter valid email!' },
			{ type: 'quotes', message: 'Please enter valid email!' },
		],
		'password': [
			{ type: 'required', message: 'Please input your password!' },
			{ type: 'maxlength', message: 'Your Password can' + "'" + 't be more than 12 characters' },
			{ type: 'invalidPassword', message: 'Your password must contain at least one uppercase, one lowercase, one number and one special character' },
			{ type: 'whitespace', message: 'Please enter valid password!' },
			{ type: 'quotes', message: 'Please enter valid password!' },
		],
		'confirm_password': [
			{ type: 'required', message: 'Please confirm your password!' },
			{ type: 'confirm', message: 'Password is inconsistent!' },
			{ type: 'whitespace', message: 'Please enter valid password!' },
			{ type: 'quotes', message: 'Please enter valid password!' },
		]
	}

	public passwordVisible = false;
	
	public passwordConfirmVisible = false;

	public loading: boolean = false;

	constructor(
		private fb: FormBuilder,
		private notification: NzNotificationService,
		private router: Router,
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

	get f() { return this.validateForm.controls; }

	public confirmValidator = (control: FormControl): { [s: string]: boolean } => {
		if (!control.value) {
			return { required: true };
		} else if (control.value !== this.f.password.value) {
			return { confirm: true, error: true };
		}
		return {};
	};

	ngOnInit() {
		this.validateForm = this.fb.group({
			firstName: new FormControl(null, {
				validators: Validators.compose([
					Validators.required,
					Validators.maxLength(15),
					CustomValidator.noWhiteSpaceValidator,
					CustomValidator.noQuotesValidator,
					CustomValidator.blockSpecialCharacter
				])
			}
			),
			emailID: new FormControl(null, {
				validators: Validators.compose([
					Validators.required,
					CustomValidator.emailValidator
				])
			}),
			password: new FormControl(null, {
				validators: Validators.compose([
					Validators.required,
					Validators.maxLength(12),
					CustomValidator.passwordPatternValidator
				])
			}),
			confirm: new FormControl(null, {
				validators: this.confirmValidator
			})
		});
	}


	public showConfirm(): void {
		for (const i in this.f) {
			this.f[i].markAsDirty();
			this.f[i].updateValueAndValidity();
		}
		if (this.validateForm.invalid) {
			return;
		}
		const id = Math.floor((Math.random() * 100) + 1);
		const params = {
			'id': id,
			'name': this.f.firstName.value,
			'email': this.f.emailID.value,
			'password': this.f.password.value,
			'imgs': []
		};
		const data = localStorage.getItem('userDetails');
		if (data) {
			const users = JSON.parse(data);
			const isExist = users.find(user => user.email === params['email']);
			if (isExist) {
				this.notification.create(
					'error',
					'User already exist',
					'Try with the another email address.'
				);
				return;
			}
			users.push(params);
			localStorage.setItem('userDetails', JSON.stringify(users))
		} else {
			const users = [];
			users.push(params);
			localStorage.setItem('userDetails', JSON.stringify(users))
		}
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
			this.validateForm.reset();
			this.router.navigateByUrl('login');
			this.notification.create(
				'success',
				'User registered',
				'User has been registered successfully.'
			);
		}, 2000);
	}


}
