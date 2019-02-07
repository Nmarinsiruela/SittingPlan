import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualGuardGuard } from './actual-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'plan',
    loadChildren: './plan/plan.module#PlanPageModule',
    canActivate: [ActualGuardGuard]
  },
  {
    path: 'plan-modal',
    loadChildren: './plan-modal/plan-modal.module#PlanModalPageModule'
  },
  {
    path: 'options',
    loadChildren: './options/options.module#OptionsPageModule'
  },
  {
    path: 'table-modal',
    loadChildren: './table-modal/table-modal.module#TableModalPageModule'
  },
  {
    path: 'table',
    loadChildren: './table/table.module#TablePageModule',
    canActivate: [ActualGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
