import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancoPreguntasListComponent } from './banco-preguntas-list/banco-preguntas-list.component';


const routes: Routes = [{
 path: 'banco-preguntas',
 children: [
   {
    path: 'get',
    component: BancoPreguntasListComponent
  },

 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class BancoPreguntasRoutingModule { }
