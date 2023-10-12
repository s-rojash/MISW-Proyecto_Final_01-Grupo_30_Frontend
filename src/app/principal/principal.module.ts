import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalPageComponent } from './principal-page/principal-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:[PrincipalPageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[PrincipalPageComponent]
})
export class PrincipalModule { }
