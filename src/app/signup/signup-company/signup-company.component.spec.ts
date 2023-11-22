/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { of, throwError } from 'rxjs';
import { DialogalertopcompComponent } from '../dialogalertopcomp/dialogalertopcomp.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupService } from '../signup.service';
import { Signupcompany } from '../signupcompany';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('SignupCompanyComponent', () => {
  let component: SignupCompanyComponent;
  let fixture: ComponentFixture<SignupCompanyComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let signupService: SignupService;
  let pass = '12345';
  let pass2 = 'emprtest';

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);
    spy.open.and.returnValue({ afterClosed: () => of({}), componentInstance: { iddialog: null } });

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })],
      declarations: [ SignupCompanyComponent, DialogalertopcompComponent ],
      providers: [{ provide: MatDialog, useValue: spy  }, SignupService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCompanyComponent);
    component = fixture.componentInstance;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    signupService = TestBed.inject(SignupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.companyRForm.patchValue({ razonSocial: 'Empresatest', tipoDocumento: 'NIT', numDocumento: 1235, digitoVerificacion: 0,
      email: 'Empresatest@test.com', password: pass2 });
    fixture.detectChanges();
    expect(component.companyRForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.companyRForm.patchValue({ razonSocial: 'Empresatest', tipoDocumento: 'NIT', numDocumento: 1235, digitoVerificacion: 0,
    email: 'Empresatesttest.com', password: pass2 });
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
    email: '', password: pass2 });
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
    email: 'Empresatest@test.com', password: pass2 });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(component.registerCompany).toHaveBeenCalled();
  });

  it("should call selectChangeHandler and change value of select NIT", waitForAsync(() => {
    const event = { target: { value: 'NIT' }};
    component.selectChangeHandler(event);
    expect(component.selectedtypeNIT).toEqual('NIT');
  }));

  it('go to open dialog success', () => {
    spyOn(component, 'openDialog');
    component.openDialog('1');
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('go to open dialog failed', () => {
    spyOn(component, 'openDialog');
    component.openDialog('2');
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should open dialog success and return response', () => {
    const resultProcess = '1';

    // Call the method you want to test
    component.openDialog(resultProcess);

    // Expect the open method of MatDialog to be called with the correct component and configuration
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogalertopcompComponent, {
      disableClose: true
    });
  });

  it('should open dialog failed and return response', () => {
    const resultProcess = '2';

    // Call the method you want to test
    component.openDialog(resultProcess);

    // Expect the open method of MatDialog to be called with the correct component and configuration
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogalertopcompComponent, {
      disableClose: true
    });
  });

  it("should call registerCompany createCompany and return response success", waitForAsync(() => {
    const signupcompany: Signupcompany = { id:0,razonSocial: "Empresa de prueba", tipoDocumento: "NIT", numDocumento: 1234,
          digitoVerificacion: 0, email: "s.rojash@uniandes.edu.co", password: pass };
    let response:Signupcompany = { id:0, razonSocial: "Empresa de prueba", tipoDocumento: "NIT", numDocumento: 1234,
          digitoVerificacion: 0, email: "s.rojash@uniandes.edu.co", password: pass };

    spyOn(signupService, 'createCompany').and.returnValue(of(response));
    spyOn(component, 'openDialog');

    component.registerCompany(signupcompany);
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalledWith('1');
  }));

  it("should call registerCompany createCompany and return response failed", waitForAsync(() => {
    const signupcompany: Signupcompany = { id:0,razonSocial: "Empresa de prueba", tipoDocumento: "NIT", numDocumento: 1234,
          digitoVerificacion: 0, email: "s.rojash@uniandes.edu.", password: pass };

    spyOn(signupService, 'createCompany').and.returnValue(throwError(() => ({ status: 404 })));
    spyOn(component, 'openDialog');

    component.registerCompany(signupcompany);
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalledWith('2');
  }));
});
