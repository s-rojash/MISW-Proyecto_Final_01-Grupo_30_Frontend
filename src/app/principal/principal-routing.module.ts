import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuseumListComponent } from '../museum/museum-list/museum-list.component';
import { ExhibitionsListComponent } from '../exhibitions/exhibitions-list/exhibitions-list.component';
import { ArtistListComponent } from '../artist/artist-list/artist-list.component';
import { ArtworksListComponent } from '../artworks/artworks-list/artworks-list.component';

const routes: Routes = [{
 path: 'principal',
 children: [
   {
     path: 'museums',
     component: MuseumListComponent
   },
   {
     path: 'artists',
     component: ArtistListComponent
   },
   {
     path: 'artworks',
     component: ArtworksListComponent
   },
 ]
}];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class PrincipalRoutingModule { }