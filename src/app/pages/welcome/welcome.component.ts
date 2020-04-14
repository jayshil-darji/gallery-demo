import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_service/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_service/common.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public isCollapsed:boolean = false;

  public userInfo = {};

  public imgSrc: string = '';

  constructor(private authService: AuthenticationService,
    private notification: NzNotificationService,
    private cookieService: CookieService,
    private router: Router,
    private commonService: CommonService) {
      this.commonService.eventObservable.subscribe(res => {
        if (res['event'] === 'imgSrc') {
          this.imgSrc = res['data'];
        }
      })
    }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
      const id = Number(token);
      const data = localStorage.getItem('userDetails');
      if (data) {
        const users = JSON.parse(data);
        const user = users.find(usr => usr['id'] === id);
        if (user) {
          this.userInfo = user;
          if (this.userInfo['imgs'].length) {
            this.imgSrc = this.userInfo['imgs'][0]['url'];
          }
        } else {
          this.showNotification('error', 'Error', 'Something went wrong please try again');
          this.cookieService.delete('token');
          this.router.navigateByUrl('login');
        }
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

  public logout(): void {
    this.authService.logout();
    this.showNotification('success', 'Logout', 'Logout successfully.');
  }

}
