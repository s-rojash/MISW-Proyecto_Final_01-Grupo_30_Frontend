import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupApplicantComponent } from '../signup/signup-applicant/signup-applicant.component';
import { SignupCompanyComponent } from '../signup/signup-company/signup-company.component';

const routes: Routes = [{
 path: 'signup',
 children: [
  {
    path: 'applicant',
    component: SignupApplicantComponent
  },
  {
    path: 'company',
    component: SignupCompanyComponent
  }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class SignpuRoutingModule { }
