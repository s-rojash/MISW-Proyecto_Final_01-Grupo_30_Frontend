import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupApplicantComponent } from '../signup/signup-applicant/signup-applicant.component';
import { SignupCompanyComponent } from '../signup/signup-company/signup-company.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SignpuRoutingModule } from './signup-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    SignpuRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [SignupApplicantComponent, SignupCompanyComponent],
  declarations: [SignupApplicantComponent, SignupCompanyComponent]
})
export class SignupModule { }
