import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListComponent } from './pages/welcome/list/list.component';
import { ViewComponent } from './pages/welcome/view/view.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'welcome',
		component: WelcomeComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: ListComponent
			},
			{
				path: 'view/:id',
				component: ViewComponent
			}
		],
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
