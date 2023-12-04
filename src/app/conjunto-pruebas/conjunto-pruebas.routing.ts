import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConjuntoPruebasCreateComponent } from './conjunto-pruebas-create/conjunto-pruebas-create.component';
import { ConjuntoPruebasListComponent } from './conjunto-pruebas-list/conjunto-pruebas-list.component';
import { ConjuntoPruebasEditComponent } from './conjunto-pruebas-edit/conjunto-pruebas-edit.component';


const routes: Routes = [{
 path: 'conjunto-pruebas',
 children: [
  {
    path: 'create',
    component: ConjuntoPruebasCreateComponent
  },
  {
    path: 'list',
    component: ConjuntoPruebasListComponent
  },
  {
    path: 'edit/:id',
    component: ConjuntoPruebasEditComponent
  },
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ConjuntoPruebasRoutingModule { }
