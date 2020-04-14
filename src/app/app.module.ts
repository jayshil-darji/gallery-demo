import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzLayoutModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { SharedModule } from './_common/shared.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { ListComponent } from './pages/welcome/list/list.component';
import { RegisterComponent } from './pages/register/register.component';

import { CookieService } from 'ngx-cookie-service';
import { ViewComponent } from './pages/welcome/view/view.component';
import { CommonService } from './_service/common.service';

registerLocaleData(en);

const PAGE_COMPONENTS = [
	AppComponent,
	WelcomeComponent,
	LoginComponent,
	ListComponent,
	RegisterComponent,
	ViewComponent
];

const PAGE_MODULES = [
	BrowserModule,
	AppRoutingModule,
	NgZorroAntdModule,
	FormsModule,
	HttpClientModule,
	BrowserAnimationsModule,
	SharedModule
];

@NgModule({
	declarations: [...PAGE_COMPONENTS],
	imports: [ ...PAGE_MODULES ],
	providers: [
		CookieService,
		CommonService,
		{ provide: NZ_I18N, useValue: en_US }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
