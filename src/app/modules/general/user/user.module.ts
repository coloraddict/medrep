import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TourPlannerComponent } from './tour-planner/tour-planner.component';
import { TodaysScheduleComponent } from './todays-schedule/todays-schedule.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LandingPageComponent,
    TourPlannerComponent,
    TodaysScheduleComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
