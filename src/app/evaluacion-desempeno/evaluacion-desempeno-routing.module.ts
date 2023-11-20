import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadosPruebasCreateComponent } from './resultados-pruebas-create/resultados-pruebas-create.component';
import { EvaluacionDesempenoListComponent } from './evaluacion-desempeno-list/evaluacion-desempeno-list.component';
import { EvaluacionDesempenoCreateComponent } from './evaluacion-desempeno-create/evaluacion-desempeno-create.component';

const routes: Routes = [{
 path: 'evaluacion-desempeno',
 children: [
  {
    path: 'get',
    component: EvaluacionDesempenoListComponent
  },
  {
    path: 'save/:id',
    component: EvaluacionDesempenoCreateComponent
  },
  {
    path: 'resultados-create/:id?',
    component: ResultadosPruebasCreateComponent
  },
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class EvaluacionDesempenoRoutingModule { }
