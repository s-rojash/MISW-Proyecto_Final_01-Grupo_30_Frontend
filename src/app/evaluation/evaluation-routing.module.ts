import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramEvaluationComponent } from './program-evaluation/program-evaluation.component';

const routes: Routes = [{
 path: 'evaluation',
 children: [
  {
    path: 'program',
    component: ProgramEvaluationComponent
  }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class EvaluationRoutingModule { }
