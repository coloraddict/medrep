import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineMasterRoutingModule } from './medicine-master-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MedicineMasterRoutingModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ]
})
export class MedicineMasterModule { }
