import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyEditComponent } from './company-edit/company-edit.component';

const routes: Routes = [{
  path: 'company',
  children: [
   {
     path: 'edit',
     component: CompanyEditComponent
   }
  ]
 }];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 })
 
export class CompanyRoutingModule {}
