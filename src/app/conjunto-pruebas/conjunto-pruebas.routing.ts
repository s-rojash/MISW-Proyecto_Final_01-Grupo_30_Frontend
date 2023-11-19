import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConjuntoPruebasCreateComponent } from './conjunto-pruebas-create/conjunto-pruebas-create.component';


const routes: Routes = [{
 path: 'conjunto-pruebas',
 children: [
  {
    path: 'create',
    component: ConjuntoPruebasCreateComponent
  }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ConjuntoPruebasRoutingModule { }
