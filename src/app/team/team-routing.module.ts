import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamAssignComponent } from './team-assign/team-assign.component';

const routes: Routes = [{
 path: 'team',
 children: [
  {
    path: 'create',
    component: TeamCreateComponent
  },
  {
    path: 'list',
    component: TeamListComponent
  },
  {
    path: 'assign',
    component: TeamAssignComponent
  }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class TeamRoutingModule { }
