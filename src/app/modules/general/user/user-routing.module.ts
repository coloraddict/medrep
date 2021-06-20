import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TourPlannerComponent } from './tour-planner/tour-planner.component';

const routes: Routes = [
  	{ path: '', pathMatch: 'full', redirectTo: "login", },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'landing-page', component: LandingPageComponent },
	{ path: 'tour-planner', component: TourPlannerComponent }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
