import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorCreateComponent } from './sponsor-create/sponsor-create.component';
import { SponsorDetailsComponent } from './sponsor-details/sponsor-details.component';
import { SponsorListComponent } from './sponsor-list/sponsor-list.component';


const routes: Routes = [{
  path: 'sponsors',
  children: [
    {
      path: 'create',
      component: SponsorCreateComponent
    },
    {
      path: 'list',
      component: SponsorListComponent
    },
    {
      path: ':id',
      component: SponsorDetailsComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }
