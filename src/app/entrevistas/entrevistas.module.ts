import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEntrevistasComponent } from './lista-entrevistas/lista-entrevistas.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { EntrevistasRoutingModule } from './entrevistas-routing.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EntrevistasRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [ListaEntrevistasComponent],
  declarations: [ListaEntrevistasComponent]
})
export class EntrevistasModule { }
