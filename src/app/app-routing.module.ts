import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalPageComponent } from './principal/principal-page/principal-page.component';
import { MuseumListComponent } from './museum/museum-list/museum-list.component';
import { ExhibitionsListComponent } from './exhibitions/exhibitions-list/exhibitions-list.component';

const routes: Routes = [
  { path: '', component: PrincipalPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
