import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestTakeComponent } from './test-take/test-take.component';

const routes: Routes = [{
 path: 'test',
 children: [
  {
    path: 'take/:id',
    component: TestTakeComponent
  }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class TestRoutingModule { }
