/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
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
import { ModalPreguntasSaveComponent } from './modal-preguntas-save.component';
import { BancoPreguntasListComponent } from '../banco-preguntas-list/banco-preguntas-list.component';
import { BancoPreguntasRoutingModule } from '../banco-preguntas-routing.module';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs';
import { Pregunta } from '../pregunta';
import { BancoPreguntas } from '../banco-preguntas';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ModalPreguntasSaveComponent', () => {
  let component: ModalPreguntasSaveComponent;
  let fixture: ComponentFixture<ModalPreguntasSaveComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ModalPreguntasSaveComponent>>;
  let bancoPreguntasService: BancoPreguntasService;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const spy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, BancoPreguntasRoutingModule, RouterTestingModule,
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
      declarations: [ ModalPreguntasSaveComponent, BancoPreguntasListComponent ],
      providers: [BancoPreguntasService, { provide: MatDialogRef, useValue: dialogRefSpy  }, { provide: ToastrService, useValue: spy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreguntasSaveComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ModalPreguntasSaveComponent>>;
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.preguntaForm.patchValue({ pregunta: 'pregunta numero 1' });
    fixture.detectChanges();
    expect(component.preguntaForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.preguntaForm.patchValue({ pregunta: '' });
    fixture.detectChanges();
    expect(component.preguntaForm.valid).toBeFalsy();
  });

  it('test call cancel button', () => {
    spyOn(component, 'onNoClick');
    let element = fixture.nativeElement.querySelector('.btn-secondary');
    element.click();
    fixture.detectChanges();
    expect(component.onNoClick).toHaveBeenCalled();
  });

  it('should close the dialog when onNoClick() is called', () => {
    component.onNoClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it("should call createPregunta createPregunta and return response success", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    let bancopregunta: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected: false };
    let pregunta = new Pregunta(1, 'Pregunta1', bancopregunta, []);
    let response = new Pregunta(1, 'Pregunta1', bancopregunta, []);

    spyOn(bancoPreguntasService, 'createPregunta').and.returnValue(of(response));

    component.createPregunta(pregunta);
    fixture.detectChanges();
    expect(toastrSpy.success).toHaveBeenCalled();
  });
});
