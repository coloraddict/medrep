import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TourPlannerComponent } from './tour-planner/tour-planner.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LandingPageComponent,
    TourPlannerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
