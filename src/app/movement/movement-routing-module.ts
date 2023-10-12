import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovementCreateComponent } from './movement-create/movement-create.component';



const routes: Routes = [{
 path: 'movements',
 children: [
   {
     path: 'create', // ruta a la lista
     component: MovementCreateComponent
   }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class MovementRoutingModule { }

