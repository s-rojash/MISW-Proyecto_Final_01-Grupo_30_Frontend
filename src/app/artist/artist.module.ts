import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { RouterModule } from '@angular/router';
import { ArtistCreateComponent } from './artist-create/artist-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ArtistListComponent,
    ArtistDetailComponent,
    ArtistCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[ArtistListComponent, ArtistDetailComponent]
})
export class ArtistModule { }
