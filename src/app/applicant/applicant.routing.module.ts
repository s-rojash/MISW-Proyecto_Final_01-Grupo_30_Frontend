import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantEditComponent } from './applicant-edit/applicant-edit.component';
import { ApplicantSkillsComponent } from './applicant-skills/applicant-skills.component';

const routes: Routes = [{
  path: 'applicant',
  children: [
   {
     path: 'edit',
     component: ApplicantEditComponent
   },
   {
    path: 'skills',
    component: ApplicantSkillsComponent
   }
  ]
 }];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 })

export class ApplicantRoutingModule {}
