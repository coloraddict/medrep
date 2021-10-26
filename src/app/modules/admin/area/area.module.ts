import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MaterialModule } from '../../shared/material/material.module';

import { AreaRoutingModule } from './area-routing.module';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    MaterialModule
  ],
  exports: [
    ListComponent
  ]
})
export class AreaModule { }
