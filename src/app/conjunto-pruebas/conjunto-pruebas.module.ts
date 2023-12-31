
import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { ConjuntoPruebasCreateComponent } from './conjunto-pruebas-create/conjunto-pruebas-create.component';
import { ConjuntoPruebasListComponent, FilterPipe } from './conjunto-pruebas-list/conjunto-pruebas-list.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConjuntoPruebasEditComponent } from './conjunto-pruebas-edit/conjunto-pruebas-edit.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    ConjuntoPruebasCreateComponent, ConjuntoPruebasListComponent, ConjuntoPruebasEditComponent, FilterPipe
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatBadgeModule,
    NgIf,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    ConjuntoPruebasCreateComponent,ConjuntoPruebasListComponent,ConjuntoPruebasEditComponent,FilterPipe
  ]
})
export class ConjuntoPruebasModule { }
