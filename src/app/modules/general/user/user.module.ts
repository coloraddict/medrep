import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LandingPageComponent
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
