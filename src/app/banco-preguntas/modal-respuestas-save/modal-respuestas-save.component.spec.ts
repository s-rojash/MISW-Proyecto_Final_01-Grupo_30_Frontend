/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BancoPreguntasListComponent } from '../banco-preguntas-list/banco-preguntas-list.component';
import { BancoPreguntasRoutingModule } from '../banco-preguntas-routing.module';
import { ModalRespuestasSaveComponent } from './modal-respuestas-save.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { Respuesta } from '../respuesta';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ModalRespuestasSaveComponent', () => {
  let component: ModalRespuestasSaveComponent;
  let fixture: ComponentFixture<ModalRespuestasSaveComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ModalRespuestasSaveComponent>>;

  beforeEach(waitForAsync(() => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, BancoPreguntasRoutingModule, RouterTestingModule,
        MatSlideToggleModule,
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
      declarations: [ ModalRespuestasSaveComponent, BancoPreguntasListComponent ],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy  }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRespuestasSaveComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ModalRespuestasSaveComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.respuestaForm.patchValue({ respuesta: 'A', puntos: 5, estado: 'pendiente' });
    fixture.detectChanges();
    expect(component.respuestaForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.respuestaForm.patchValue({ respuesta: '', puntos: 5, estado: '' });
    fixture.detectChanges();
    expect(component.respuestaForm.valid).toBeFalsy();
  });

  it('all fields empty', () => {
    component.respuestaForm.patchValue({ respuesta: '', puntos: 0, estado: '' });
    fixture.detectChanges();
    expect(component.respuestaForm.valid).toBeFalsy();
  });

  it('should return form inValid null values', () => {
    component.respuestaForm.patchValue({ respuesta: null, puntos: null, estado: 'pendiente' });
    fixture.detectChanges();
    expect(component.respuestaForm.valid).toBeFalsy();
  });

  it('should close the dialog when onNoClick() is called', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it("should call retornarRespuesta respuesta undefined", () => {
    component.respuestaForm.patchValue({ respuesta: 'A', puntos: 5, estado: 'pendiente' });
    component.retornarRespuesta();
    fixture.detectChanges();
    expect(component.respuesta.respuesta).toEqual('A');
  });

  it("should call retornarRespuesta respuesta not undefined", () => {
    let respuesta: Respuesta = { idRespuesta: 1, respuesta: 'A', estado: 'pendiente', puntos: 10, pregunta: null };

    component.respuesta = respuesta;
    component.respuestaForm.patchValue({ respuesta: 'A', puntos: 5, estado: 'pendiente' });
    component.retornarRespuesta();
    fixture.detectChanges();
    expect(component.respuesta.respuesta).toEqual('A');
  });
});
