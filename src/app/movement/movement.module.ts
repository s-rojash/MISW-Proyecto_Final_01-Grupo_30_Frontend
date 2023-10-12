import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovementCreateComponent } from './movement-create/movement-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovementRoutingModule } from './movement-routing-module'

@NgModule({
  declarations: [
    MovementCreateComponent
  ],
  imports: [
    CommonModule,
   RouterModule,
   MovementRoutingModule,
   ReactiveFormsModule
  ]
})
export class MovementModule { }
