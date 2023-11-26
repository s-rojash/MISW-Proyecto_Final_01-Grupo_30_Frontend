import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResultadosListComponent } from './resultados-list/resultados-list.component';


const routes: Routes = [{
  path: 'resultados',
  children: [
   {
     path: 'get',
     component: ResultadosListComponent
   }
 
  ]
 }];


 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
 })


export class ResultadosRoutingModule { }
 
