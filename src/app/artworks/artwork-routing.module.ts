import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArtworksListComponent } from './artworks-list/artworks-list.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { ArtworkCreateComponent } from "./artwork-create/artwork-create.component";

const routes: Routes = [{
    path: 'obras',
    children: [
        {
          path: 'create',
          component: ArtworkCreateComponent
        },
        {
            path: 'list',
            component: ArtworksListComponent
        },
        {
            path: ':id',
            component: ArtworkDetailComponent
        },
        {
            path: 'list/:id',
            component: ArtworksListComponent
        },
        {
          path: 'listExh/:id',
          component: ArtworksListComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArtworkRoutingModule {}
