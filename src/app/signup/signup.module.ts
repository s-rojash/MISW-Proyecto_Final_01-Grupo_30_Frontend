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
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {NgIf} from '@angular/common';
import { DialogalertopcompComponent } from '../signup/dialogalertopcomp/dialogalertopcomp.component';
import { DialogalertopappliComponent } from '../signup/dialogalertopappli/dialogalertopappli.component';
import { MatDialogModule} from '@angular/material/dialog';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    SignpuRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatIconModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatDialogModule
  ],
  exports: [SignupApplicantComponent, SignupCompanyComponent, DialogalertopcompComponent, DialogalertopappliComponent],
  declarations: [SignupApplicantComponent, SignupCompanyComponent, DialogalertopcompComponent, DialogalertopappliComponent]
})
export class SignupModule { }
