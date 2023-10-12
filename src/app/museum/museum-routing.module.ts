import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuseumListComponent } from './museum-list/museum-list.component';
import { MuseumDetailComponent } from './museum-detail/museum-detail.component';
import { ExhibitionsListComponent } from '../exhibitions/exhibitions-list/exhibitions-list.component';
import { MuseumCreateComponent } from './museum-create/museum-create.component';

const routes: Routes = [{
 path: 'museums',
 children: [
   {
     path: 'list',
     component: MuseumListComponent
   },
   {
     path: 'create',
     component: MuseumCreateComponent
   },
   {
     path: ':id',
     component: MuseumDetailComponent
   },
   {
     path: ':museum_id',
     component: ExhibitionsListComponent
   },
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class MuseumRoutingModule { }