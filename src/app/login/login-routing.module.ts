import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuseumListComponent } from '../museum/museum-list/museum-list.component';

const routes: Routes = [{
 path: 'login',
 children: [
  {
    path: 'museums',
    component: MuseumListComponent
  }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class LoginRoutingModule { }
