import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantSearchGetComponent } from './applicant-search-get/applicant-search-get.component';

const routes: Routes = [{
    path: 'applicantsearch',
    children: [
      {
       path: 'get',
       component: ApplicantSearchGetComponent
     },
     
    ]
   }];
   
   @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
   })
   export class ApplicationSearchRoutingModule { }