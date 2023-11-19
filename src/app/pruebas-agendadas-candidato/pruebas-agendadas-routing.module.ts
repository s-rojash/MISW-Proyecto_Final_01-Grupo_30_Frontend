import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasAgendadasListComponent } from './pruebas-agendadas-list/pruebas-agendadas-list.component';

const routes: Routes = [{
 path: 'pruebas-agendadas',
 children: [
  {
    path: 'get',
    component: PruebasAgendadasListComponent
  },
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class PruebasAgendadasRoutingModule  { }
