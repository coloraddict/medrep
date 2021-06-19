import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', loadChildren: () => import('./modules/general/user/user.module') 
      .then(mod => mod.UserModule)
  },
  {
    path: 'admin/area', loadChildren: () => import('./modules/admin/area/area.module')
      .then(mod => mod.AreaModule)
  },
  {
    path: 'admin/medicines', loadChildren: () => import('./modules/admin/medicine-master/medicine-master.module')
      .then(mod => mod.MedicineMasterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
