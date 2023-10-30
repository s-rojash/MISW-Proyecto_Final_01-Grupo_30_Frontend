/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';
import { SignupApplicantComponent } from './signup-applicant.component';
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

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('SignupApplicantComponent', () => {
  let component: SignupApplicantComponent;
  let fixture: ComponentFixture<SignupApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
          MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,
          TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
        declarations: [ SignupApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.applicantRForm.patchValue({ nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
      email: 'candidato@cand.com', password: 'candidatopass' });
    fixture.detectChanges();
    expect(component.applicantRForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.applicantRForm.patchValue({ nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
    email: 'candidato', password: 'candidatopass' });
    fixture.detectChanges();
    expect(component.applicantRForm.valid).toBeFalsy();
  });

  it('all fields empty', () => {
    component.applicantRForm.patchValue({ nombres: '', apellidos: '', tipoDocumento: '', numDocumento: null, celular: '',
    email: '', password: '' });
    fixture.detectChanges();
    expect(component.applicantRForm.valid).toBeFalsy();
  });

  it('email empty', () => {
    component.applicantRForm.patchValue({ nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
    email: '', password: 'candidatopass' });
    fixture.detectChanges();
    expect(component.applicantRForm.valid).toBeFalsy();
  });

  it('password empty', () => {
    component.applicantRForm.patchValue({ nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
    email: 'candidato@cand.com', password: '' });
    fixture.detectChanges();
    expect(component.applicantRForm.valid).toBeFalsy();
  });

  it('registerApplicant test', () => {
    spyOn(component, 'registerApplicant');
    component.applicantRForm.patchValue({ nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
    email: 'candidato@cand.com', password: 'candidatopass' });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(component.registerApplicant).toHaveBeenCalled();
  });
});
