import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AreaRoutingModule } from './area-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  exports: [
    ListComponent
  ]
})
export class AreaModule { }
