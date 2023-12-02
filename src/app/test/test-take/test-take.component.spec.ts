/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule, NgIf } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { TestTakeComponent } from './test-take.component';
import { Pregunta } from '../pregunta';
import { Respuesta } from '../respuesta';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('TestTakeComponent', () => {
  let component: TestTakeComponent;
  let fixture: ComponentFixture<TestTakeComponent>;
  let toastrService: ToastrService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
        MatExpansionModule,
        MatNativeDateModule,
        MatRadioModule,
        NgIf,
        HttpClientTestingModule,
        RouterTestingModule,
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
        })
      ],
      declarations: [ TestTakeComponent ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke the method isButtonEndDisabled and disabled true', () => {
    const pregunta: Pregunta[][] = [[{id:1, pregunta:'pregunta1', respuestas:[]}]]
    component.listaSeleccion = pregunta;
    component.idPreguntaContestada = "";
    fixture.detectChanges();
    expect(component.isButtonEndDisabled()).toBe(true);
  });

  it('should invoke the method isButtonEndDisabled and disabled false', () => {
    const pregunta: Pregunta[][] = [[{id:1, pregunta:'pregunta1', respuestas:[]}]]
    component.listaSeleccion = pregunta;
    component.idPreguntaContestada = ", ,1";
    fixture.detectChanges();
    expect(component.isButtonEndDisabled()).toBe(false);
  });

  it('should invoke the method isButtonDisabled and disabled true', () => {
    component.selectedValue = null;
    fixture.detectChanges();
    expect(component.isButtonDisabled()).toBe(true);
  });

  it('should invoke the method isButtonDisabled and disabled false', () => {
    const respuesta: Respuesta = {id: 1, respuesta: 'respuesta1', estado: 'pendiente', puntos: 0};
    component.selectedValue = respuesta;
    fixture.detectChanges();
    expect(component.isButtonDisabled()).toBe(false);
  });
});
