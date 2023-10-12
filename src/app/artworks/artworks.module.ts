import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworksListComponent } from './artworks-list/artworks-list.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtworkCreateComponent } from './artwork-create/artwork-create.component';
import { ArtworkRoutingModule } from './artwork-routing.module';

@NgModule({
  declarations: [
    ArtworksListComponent,
    ArtworkDetailComponent,
    ArtworkCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ArtworkRoutingModule,
    ReactiveFormsModule
  ],
  exports: [ArtworksListComponent, ArtworkDetailComponent, ArtworkCreateComponent],
})
export class ArtworksModule { }
