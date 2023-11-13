import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEntrevistasComponent } from './lista-entrevistas/lista-entrevistas.component';

const routes: Routes = [{
 path: 'entrevistas',
 children: [
  {
    path: 'lista',
    component: ListaEntrevistasComponent
  },
]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class EntrevistasRoutingModule { }
