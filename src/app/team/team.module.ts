import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { TeamCreateComponent } from './team-create/team-create.component';
import { HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TeamRoutingModule } from './team-routing.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TeamListComponent } from './team-list/team-list.component';
import { MatOptionModule } from '@angular/material/core';
import { TeamAssignComponent } from './team-assign/team-assign.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    TeamRoutingModule,
    MatSelectModule,
    MatOptionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatIconModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatDialogModule,
    MatTableModule
  ],
  declarations: [TeamCreateComponent,TeamListComponent, TeamAssignComponent],
  exports:[TeamCreateComponent,TeamListComponent, TeamAssignComponent]
})
export class TeamModule { }
