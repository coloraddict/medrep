import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', redirectTo: 'user', pathMatch: 'full'
  },
  { 
    path: 'user', loadChildren: () => import('./modules/general/user/user.module') 
      .then(mod => mod.UserModule)
  },
  {
    path: 'area', loadChildren: () => import('./modules/admin/area/area.module')
      .then(mod => mod.AreaModule)
  },
  {
    path: 'medicines', loadChildren: () => import('./modules/admin/medicine-master/medicine-master.module')
      .then(mod => mod.MedicineMasterModule)
  },
  {
    path: 'patch', loadChildren: () => import('./modules/admin/patch-master/patch-master.module')
      .then(mod => mod.PatchMasterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
