import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatchMasterRoutingModule } from './patch-master-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';

import { PatchListComponent } from './patch-list/patch-list.component';

@NgModule({
  declarations: [
    PatchListComponent
  ],
  imports: [
    CommonModule,
    PatchMasterRoutingModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ]
})
export class PatchMasterModule { }
