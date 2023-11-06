import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { NgIf } from '@angular/common';

import { BancoPreguntasListComponent } from './banco-preguntas-list/banco-preguntas-list.component';
import { CategoriasListComponent } from './categorias-list/categorias-list.component';
import { BancoPreguntasCreateComponent } from './banco-preguntas-create/banco-preguntas-create.component';
import { ListaPreguntasListComponent } from './lista-preguntas/lista-preguntas-list.component';
import { ModalPreguntasSaveComponent } from './modal-preguntas-save/modal-preguntas-save.component';
import { ModalRespuestasSaveComponent } from './modal-respuestas-save/modal-respuestas-save.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    BancoPreguntasListComponent,
    BancoPreguntasCreateComponent,
    ListaPreguntasListComponent,
    ModalPreguntasSaveComponent,
    ModalRespuestasSaveComponent,
    CategoriasListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    BancoPreguntasListComponent,
    BancoPreguntasCreateComponent,
    ListaPreguntasListComponent,
    ModalPreguntasSaveComponent,
    ModalRespuestasSaveComponent,
    CategoriasListComponent
  ]
})
export class BancoPreguntasModule { }
