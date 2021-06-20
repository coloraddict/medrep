import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatchListComponent } from './patch-list/patch-list.component';

const routes: Routes = [
  { path: '', component: PatchListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatchMasterRoutingModule { }
