/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
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
import { ListaPreguntasListComponent } from './lista-preguntas-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { of } from 'rxjs';
import { Pregunta } from '../pregunta';
import { BancoPreguntas } from '../banco-preguntas';
import { Respuesta } from '../respuesta';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ListaPreguntasListComponent', () => {
  let component: ListaPreguntasListComponent;
  let fixture: ComponentFixture<ListaPreguntasListComponent>;
  let bancoPreguntasService: BancoPreguntasService;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });

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
      declarations: [ ListaPreguntasListComponent ],
      providers: [BancoPreguntasService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPreguntasListComponent);
    component = fixture.componentInstance;
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test button add', () => {
    spyOn(component, 'agregarPregunta');
    let element = fixture.nativeElement.querySelector('.btn-primary');
    element.click();
    fixture.detectChanges();
    expect(component.agregarPregunta).toHaveBeenCalled();
  });

  it("should call getListaPreguntasBanco getListaPreguntasBanco and return response success", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let respuestas: Respuesta[] = [{ idRespuesta: 1, respuesta: 'A', estado: 'pendiente', puntos: 5, pregunta: null }];
    let response: Pregunta[] = [{ id: 1, pregunta: '', bancoPreguntas: bancopregunta, respuestas:respuestas }];

    spyOn(bancoPreguntasService, 'getListaPreguntasBanco').and.returnValue(of(response));
    component.bancoPreguntas = bancopregunta;

    component.getListaPreguntasBanco();
    fixture.detectChanges();
    expect(component.listaPreguntasBanco).toEqual(response);
  });

  it("should call getListaPreguntasBanco with bancoPreguntas null or empty", () => {
    component.getListaPreguntasBanco();
    fixture.detectChanges();
    expect(component.listaPreguntasBanco).toHaveSize(0);
  });

  it("should call agregarPregunta and open dialog and return a result", () => {
    component.agregarPregunta();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it("should call agregarPregunta textoPregunta is undefined", () => {
    dialogRefSpyObj.textoPregunta = undefined;
    component.agregarPregunta();
    fixture.detectChanges();
    console.log(dialogRefSpyObj.textoPregunta);
    expect(dialogRefSpyObj.textoPregunta).toBeUndefined();
  });

  it("should call agregarPregunta textoPregunta is not undefined", () => {
    dialogRefSpyObj.textoPregunta = 'Prueba1';
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let pregunta = new Pregunta(null, dialogRefSpyObj.textoPregunta, bancopregunta, []);
    spyOn(bancoPreguntasService, 'createPregunta').and.returnValue(of(pregunta));
    spyOn(component, 'getListaPreguntasBanco');

    component.agregarPregunta();
    fixture.detectChanges();
    expect(component.getListaPreguntasBanco).toHaveBeenCalled();
  });

  it("should call agregarRespuesta and open dialog and return a result", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let pregunta: Pregunta = { id: 1, pregunta: 'Pregunta1', bancoPreguntas: bancopregunta, respuestas: [] };

    component.agregarRespuesta(pregunta);
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it("should call agregarRespuesta respuesta is undefined", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let pregunta: Pregunta = { id: 1, pregunta: 'Pregunta1', bancoPreguntas: bancopregunta, respuestas: [] };

    dialogRefSpyObj.respuesta = undefined;
    component.agregarRespuesta(pregunta);
    fixture.detectChanges();
    expect(dialogRefSpyObj.respuesta).toBeUndefined();
  });

  it("should call agregarRespuesta respuesta is not undefined", () => {
    let respuesta: Respuesta = { idRespuesta: 1, respuesta: 'A', estado: 'pendiente', puntos: 10, pregunta: null };
    dialogRefSpyObj.respuesta = respuesta;
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let pregunta = new Pregunta(null, dialogRefSpyObj.textoPregunta, bancopregunta, []);
    spyOn(bancoPreguntasService, 'createRespuesta').and.returnValue(of(respuesta));
    spyOn(component, 'getListaPreguntasBanco');

    component.agregarRespuesta(pregunta);
    fixture.detectChanges();
    expect(component.getListaPreguntasBanco).toHaveBeenCalled();
  });

  it("should call modificarRespuesta and open dialog and return a result", () => {
    let respuesta: Respuesta = { idRespuesta: 1, respuesta: 'A', estado: 'pendiente', puntos: 10, pregunta: null };
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let pregunta: Pregunta = { id: 1, pregunta: 'Pregunta1', bancoPreguntas: bancopregunta, respuestas: [] };

    component.modificarRespuesta(pregunta, respuesta);
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it("should call modificarRespuesta respuesta is undefined", () => {
    let respuesta: Respuesta = { idRespuesta: 1, respuesta: 'A', estado: 'pendiente', puntos: 10, pregunta: null };
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let pregunta: Pregunta = { id: 1, pregunta: 'Pregunta1', bancoPreguntas: bancopregunta, respuestas: [] };

    dialogRefSpyObj.respuesta = undefined;
    component.modificarRespuesta(pregunta, respuesta);
    fixture.detectChanges();
    expect(dialogRefSpyObj.respuesta).toBeUndefined();
  });

  it("should call modificarRespuesta respuesta is not undefined", () => {
    let respuesta: Respuesta = { idRespuesta: 1, respuesta: 'A', estado: 'pendiente', puntos: 10, pregunta: null };
    dialogRefSpyObj.respuesta = respuesta;
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria };
    let pregunta = new Pregunta(null, dialogRefSpyObj.textoPregunta, bancopregunta, []);
    spyOn(bancoPreguntasService, 'createRespuesta').and.returnValue(of(respuesta));
    spyOn(component, 'getListaPreguntasBanco');

    component.modificarRespuesta(pregunta, respuesta);
    fixture.detectChanges();
    expect(component.getListaPreguntasBanco).toHaveBeenCalled();
  });
});

