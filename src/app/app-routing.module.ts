import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 
  {
    path:'login',
    pathMatch: 'full',
    loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
