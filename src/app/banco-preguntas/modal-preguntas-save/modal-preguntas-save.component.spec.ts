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
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ModalPreguntasSaveComponent', () => {
  let component: ModalPreguntasSaveComponent;
  let fixture: ComponentFixture<ModalPreguntasSaveComponent>;

  beforeEach(waitForAsync(() => {
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
      providers: [{ provide: MatDialogRef, useValue: {}  }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreguntasSaveComponent);
    component = fixture.componentInstance;
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
});
