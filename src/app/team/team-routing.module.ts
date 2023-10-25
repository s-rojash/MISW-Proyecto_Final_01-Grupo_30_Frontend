import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamCreateComponent } from './team-create/team-create.component';

const routes: Routes = [{
 path: 'team',
 children: [
  {
    path: 'create',
    component: TeamCreateComponent
  }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class TeamRoutingModule { }
