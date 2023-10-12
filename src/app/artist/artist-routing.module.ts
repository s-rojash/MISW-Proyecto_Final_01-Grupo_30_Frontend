import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtworksListComponent } from '../artworks/artworks-list/artworks-list.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';

const routes: Routes = [{
 path: 'artistas',
 children: [
    {
     path: 'create', // formula de creacion
     component: ArtistCreateComponent
   },
   {
     path: 'list', // ruta a la lista
     component: ArtistListComponent
   },
   
   {
     path: ':id', //ruta a un solo elemento (detalle)
     component: ArtistDetailComponent
   },
   {
     path: ':artist_id',
     component: ArtworksListComponent
   }
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class ArtistRoutingModule { }
