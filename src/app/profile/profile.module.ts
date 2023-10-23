import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    NgIf,
  ],
  declarations: [ProfileCreateComponent],
  exports:[ProfileCreateComponent ]

  
  
  
})
export class ProfileModule { }
