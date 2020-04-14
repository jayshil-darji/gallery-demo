import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

	public loggedInStatus;

	constructor(private cookieService: CookieService, private router: Router) {
		this.loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
	}

	private hasToken(): boolean {
		return !!this.cookieService.get('token');
	}


	public isLoggedIn() {
		return this.loggedInStatus.asObservable();
	}

	public logout() {
		this.loggedInStatus.next(false);
		this.cookieService.delete('token');
		setTimeout(() => {
			const isTokenStillAvail = this.cookieService.get('token');
			if (isTokenStillAvail) {
				this.cookieService.set('token', null);
			}
		}, 1000);
		this.router.navigateByUrl('login');
	}
}
