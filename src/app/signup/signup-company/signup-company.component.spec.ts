/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
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
import { SignupCompanyComponent } from './signup-company.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('SignupCompanyComponent', () => {
  let component: SignupCompanyComponent;
  let fixture: ComponentFixture<SignupCompanyComponent>;

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
      declarations: [ SignupCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.companyRForm.patchValue({ razonSocial: 'Empresatest', tipoDocumento: 'NIT', numDocumento: 1235, digitoVerificacion: 0,
      email: 'Empresatest@test.com', password: 'emprtest' });
    fixture.detectChanges();
    expect(component.companyRForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.companyRForm.patchValue({ razonSocial: 'Empresatest', tipoDocumento: 'NIT', numDocumento: 1235, digitoVerificacion: 0,
    email: 'Empresatesttest.com', password: 'emprtest' });
    fixture.detectChanges();
    expect(component.companyRForm.valid).toBeFalsy();
  });

  it('all fields empty', () => {
    component.companyRForm.patchValue({ razonSocial: '', tipoDocumento: '', numDocumento: null, digitoVerificacion: null,
    email: '', password: '' });
    fixture.detectChanges();
    expect(component.companyRForm.valid).toBeFalsy();
  });

  it('email empty', () => {
    component.companyRForm.patchValue({ razonSocial: 'Empresatest', tipoDocumento: 'NIT', numDocumento: 1235, digitoVerificacion: 0,
    email: '', password: 'emprtest' });
    fixture.detectChanges();
    expect(component.companyRForm.valid).toBeFalsy();
  });

  it('password empty', () => {
    component.companyRForm.patchValue({ razonSocial: 'Empresatest', tipoDocumento: 'NIT', numDocumento: 1235, digitoVerificacion: 0,
    email: 'Empresatesttest.com', password: '' });
    fixture.detectChanges();
    expect(component.companyRForm.valid).toBeFalsy();
  });

  it('registerCompany test', () => {
    spyOn(component, 'registerCompany');
    component.companyRForm.patchValue({ razonSocial: 'Empresatest', tipoDocumento: 'NIT', numDocumento: 1235, digitoVerificacion: 0,
    email: 'Empresatest@test.com', password: 'emprtest' });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(component.registerCompany).toHaveBeenCalled();
  });
});
