import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaPruebasListComponent } from './agenda-pruebas-list/agenda-pruebas-list.component';
import { AgendaPruebasCreateComponent } from './agenda-pruebas-create/agenda-pruebas-create.component';

const routes: Routes = [{
 path: 'agenda-pruebas',
 children: [
  {
    path: 'get',
    component: AgendaPruebasListComponent
  },
  {
    path: 'save',
    component: AgendaPruebasCreateComponent
  },
  {
    path: 'save/:id?',
    component: AgendaPruebasCreateComponent
  },
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class AgendaPruebaRoutingModule { }
