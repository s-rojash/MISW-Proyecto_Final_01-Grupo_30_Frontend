import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalPageComponent } from './principal-page/principal-page.component';

const routes: Routes = [{
 path: 'principal',
 children: [
   {
     path: '',
     component: PrincipalPageComponent
   }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class PrincipalRoutingModule { }
