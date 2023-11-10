/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgendaPruebasListComponent } from './agenda-pruebas-list.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoriasListComponent } from '../../banco-preguntas/categorias-list/categorias-list.component';
import { AgendaPruebaService } from '../agenda-prueba.service';
import { of } from 'rxjs';
import { AgendaPrueba } from '../agenda-prueba';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('AgendaPruebasListComponent', () => {
  let component: AgendaPruebasListComponent;
  let fixture: ComponentFixture<AgendaPruebasListComponent>;
  let agendaPruebaService: AgendaPruebaService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
        }),
        ToastrModule.forRoot({
          timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }),],
      declarations: [ AgendaPruebasListComponent, CategoriasListComponent ],
      providers: [AgendaPruebaService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPruebasListComponent);
    component = fixture.componentInstance;
    agendaPruebaService = TestBed.inject(AgendaPruebaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getListaPreguntas getListaAgendaPrueba and return response success", () => {
    const date = new Date('10/28/2023');

    let response: AgendaPrueba[] = [{ id: 1, idEmpresa: 1, idCandidato: 1, idPrueba: 1, fecha: date, puntos: 5, estado: 'pendiente' }];

    spyOn(agendaPruebaService, 'getListaAgendaPrueba').and.returnValue(of(response));

    component.getListaPreguntas();
    fixture.detectChanges();
    expect(component.listaAgendaPruebas).toEqual(response);
  });
});

