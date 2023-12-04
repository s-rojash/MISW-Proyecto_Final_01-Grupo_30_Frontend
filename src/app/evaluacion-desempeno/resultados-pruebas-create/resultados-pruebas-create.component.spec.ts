/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultadosPruebasCreateComponent } from './resultados-pruebas-create.component';
import { AgendaPruebasListComponent } from 'src/app/agendapruebas/agenda-pruebas-list/agenda-pruebas-list.component';
import { AgendaPruebaRoutingModule } from 'src/app/agendapruebas/agenda-prueba-routing.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AgendaPruebaService } from 'src/app/agendapruebas/agenda-prueba.service';
import { of } from 'rxjs';
import { Candidato } from '../candidato';
import { BancoPreguntasService } from 'src/app/banco-preguntas/banco-preguntas.service';
import { Prueba } from 'src/app/banco-preguntas/prueba';
import { ActivatedRoute } from '@angular/router';
import { AgendaPrueba } from '../../../app/agendapruebas/agenda-prueba';
import { BancoPreguntas } from '../../../app/banco-preguntas/banco-preguntas';
import { Pregunta } from '../../../app/banco-preguntas/pregunta';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ResultadosPruebasCreateComponent', () => {
  let component: ResultadosPruebasCreateComponent;
  let fixture: ComponentFixture<ResultadosPruebasCreateComponent>;
  let agendaPruebaService: AgendaPruebaService;
  let bancoPreguntasService: BancoPreguntasService;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let mockActivatedRoute: any;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success']);
    mockActivatedRoute = {
      params: of({ 'id?': '1' }) // Provide the necessary params for testing
    };

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, AgendaPruebaRoutingModule, RouterTestingModule,
        MatDatepickerModule, MatNativeDateModule, MatSelectModule, HttpClientTestingModule,
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
      })],
      declarations: [ ResultadosPruebasCreateComponent, AgendaPruebasListComponent ],
      providers: [AgendaPruebaService, BancoPreguntasService, { provide: ToastrService, useValue: spy }, { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosPruebasCreateComponent);
    component = fixture.componentInstance;
    agendaPruebaService = TestBed.inject(AgendaPruebaService);
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getPrueba and return response success", () => {
    let response: Prueba = {
      id: 1, nombre: "Test",
      descripcion: "Prueba",
      bancosPreguntas: []
    };

    spyOn(bancoPreguntasService, 'getPrueba').and.returnValue(of(response));

    component.getPrueba(1);
    fixture.detectChanges();
    expect(component.prueba).toEqual(response);
  });

  it("should call getCandidato and return response success", () => {
    let response: Candidato = {
      id: 1,
      nombres: "Test",
      apellidos: "Prueba",
      email: "test@test.com",
      numDocumento : 123456,
      celular: "3000000000"
    };
    spyOn(agendaPruebaService, 'getCandidato').and.returnValue(of(response));
    component.getCandidato(1);
    fixture.detectChanges();
    expect(component.candidato).toEqual(response);
  });

  it("should call setRespuesta and return response success", () => {
    let response: any = {idPregunta: 1, idRespuesta: 2};

    component.setRespuesta(2,3);
    expect(component.respuestasSeleccionadas[2]).toEqual(3);
  });

  it("should call ngOnInit and call the service getAgendaPrueba", () => {
    const date = new Date('10/28/2023');
    const prueba: Prueba = {id: 1, nombre: 'Prueba', descripcion: 'prueba des', bancosPreguntas: []};
    let response: AgendaPrueba = { id: 0, idCandidato: 1, prueba: prueba, puntaje: 0, estado: 'Pendiente', fechaPresentacion: date };

    spyOn(agendaPruebaService ,'getAgendaPrueba').and.returnValue(of(response));
    spyOn(component, 'getPrueba');
    component.ngOnInit();
    fixture.detectChanges();
    expect(agendaPruebaService.getAgendaPrueba).toHaveBeenCalled();
    expect(component.getPrueba).toHaveBeenCalled();
  });

  it("should call getPrueba ", fakeAsync(() => {
    const categoria = { id: 1, nombre: 'sojash' };
    let bancoPreguntas: BancoPreguntas[] = [{ id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected: false }];
    let bancoPreguntas2: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected: false };
    let response: Prueba = {
      id: 1, nombre: "Test",
      descripcion: "Prueba",
      bancosPreguntas: bancoPreguntas
    };
    let responsePregunta: Pregunta[] = [{id: 1, pregunta: 'pregunta1', bancoPreguntas: bancoPreguntas2, respuestas: []}]

    spyOn(bancoPreguntasService, 'getPrueba').and.returnValue(of(response));
    spyOn(bancoPreguntasService, 'getListaPreguntasBanco').and.returnValue(of(responsePregunta));

    component.getPrueba(1);
    tick();
    fixture.detectChanges();
    expect(bancoPreguntasService.getListaPreguntasBanco).toHaveBeenCalled();
  }));
});
