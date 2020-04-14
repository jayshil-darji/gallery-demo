import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_service/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	constructor(private router: Router,
		private authervice: AuthenticationService) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		let isLoggedIn;
		this.authervice.isLoggedIn().subscribe(
			(data) => {
				isLoggedIn = data;
			}
		);
		if (isLoggedIn) {
			return true;
		}
		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}