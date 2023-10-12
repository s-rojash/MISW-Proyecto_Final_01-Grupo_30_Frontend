import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';
import { SponsorDetailsComponent } from './sponsor-details/sponsor-details.component';
import { RouterModule } from '@angular/router';
import { SponsorRoutingModule } from './sponsor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SponsorCreateComponent } from './sponsor-create/sponsor-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SponsorRoutingModule,
    ReactiveFormsModule
  ],
  exports:[SponsorListComponent, SponsorDetailsComponent, SponsorCreateComponent],
  declarations: [SponsorListComponent, SponsorDetailsComponent, SponsorCreateComponent]
})
export class SponsorModule { }
