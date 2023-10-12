import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionsListComponent } from './exhibitions-list/exhibitions-list.component';
import { ExhibitionsDetailsComponent } from './exhibitions-details/exhibitions-details.component';
import { RouterModule } from '@angular/router';
import { ExhibtionRoutingModule } from './exhibition-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExhibitionsCreateComponent } from './exhibitions-create/exhibitions-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ExhibtionRoutingModule,
    ReactiveFormsModule
  ],
  exports:[ExhibitionsListComponent, ExhibitionsDetailsComponent, ExhibitionsCreateComponent],
  declarations: [ExhibitionsListComponent, ExhibitionsDetailsComponent, ExhibitionsCreateComponent]
})
export class ExhibitionsModule { }
