import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { DialogtypesignupComponent } from './dialogtypesignup/dialogtypesignup.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [LoginPageComponent, DialogtypesignupComponent],
  declarations:[LoginPageComponent, DialogtypesignupComponent]
})
export class LoginModule { }
