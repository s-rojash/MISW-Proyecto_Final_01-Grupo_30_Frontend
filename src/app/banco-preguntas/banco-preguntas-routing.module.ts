import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancoPreguntasListComponent } from './banco-preguntas-list/banco-preguntas-list.component';
import { BancoPreguntasCreateComponent } from './banco-preguntas-create/banco-preguntas-create.component';

const routes: Routes = [{
 path: 'banco-preguntas',
 children: [
  {
    path: 'get',
    component: BancoPreguntasListComponent
  },
  {
    path: 'create',
    component: BancoPreguntasCreateComponent
  },
  {
    path: 'create/:id?',
    component: BancoPreguntasCreateComponent
  },
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class BancoPreguntasRoutingModule { }
