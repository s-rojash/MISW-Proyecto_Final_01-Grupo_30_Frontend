import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExhibitionsCreateComponent } from './exhibitions-create/exhibitions-create.component';
import { ExhibitionsDetailsComponent } from './exhibitions-details/exhibitions-details.component';
import { ExhibitionsListComponent } from './exhibitions-list/exhibitions-list.component';


const routes: Routes = [{
  path: 'exhibitions',
  children: [
    {
      path: 'create',
      component: ExhibitionsCreateComponent
    },
    {
      path: 'list/:id',
      component: ExhibitionsListComponent
    },
    {
      path: 'list/:id/:idExh',
      component: ExhibitionsListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExhibtionRoutingModule { }
