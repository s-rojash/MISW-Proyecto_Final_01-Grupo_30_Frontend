/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
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
import { SignupService } from '../signup.service';
import { of, throwError } from 'rxjs';
import { DialogalertopappliComponent } from '../dialogalertopappli/dialogalertopappli.component';
import { Signupapplicant } from '../signupapplicant';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('SignupApplicantComponent', () => {
  let component: SignupApplicantComponent;
  let fixture: ComponentFixture<SignupApplicantComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let signupService: SignupService;
  let pass = 'candidatopass';
  let pass2 = '12345';

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);
    spy.open.and.returnValue({ afterClosed: () => of({}), componentInstance: { iddialog: null } });

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
        declarations: [ SignupApplicantComponent, DialogalertopappliComponent ],
        providers: [{ provide: MatDialog, useValue: spy  }, SignupService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupApplicantComponent);
    component = fixture.componentInstance;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    signupService = TestBed.inject(SignupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.applicantRForm.patchValue({ nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
      email: 'candidato@cand.com', password: pass });
    fixture.detectChanges();
    expect(component.applicantRForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.applicantRForm.patchValue({ nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
    email: 'candidato', password: pass });
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
    email: '', password: pass });
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
    email: 'candidato@cand.com', password: pass });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(component.registerApplicant).toHaveBeenCalled();
  });

  it("should call selectChangeHandler and change value of select C.C.", waitForAsync(() => {
    const event = { target: { value: 'C.C.' }};
    component.selectChangeHandler(event);
    expect(component.selectedtypeNIT).toEqual('C.C.');
  }));

  it("should call selectChangeHandler and change value of select C.E.", waitForAsync(() => {
    const event = { target: { value: 'C.E.' }};
    component.selectChangeHandler(event);
    expect(component.selectedtypeNIT).toEqual('C.E.');
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
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogalertopappliComponent, {
      disableClose: true
    });
  });

  it('should open dialog failed and return response', () => {
    const resultProcess = '2';

    // Call the method you want to test
    component.openDialog(resultProcess);

    // Expect the open method of MatDialog to be called with the correct component and configuration
    expect(dialogSpy.open).toHaveBeenCalledWith(DialogalertopappliComponent, {
      disableClose: true
    });
  });

  it("should call registerApplicant createApplicant and return response success", waitForAsync(() => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    let response:Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
    numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };

    spyOn(signupService, 'createApplicant').and.returnValue(of(response));
    spyOn(component, 'openDialog');

    component.registerApplicant(signupapplicant);
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalledWith('1');
  }));

  it("should call registerApplicant createApplicant and return response failed", waitForAsync(() => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.", password: pass2 };

    spyOn(signupService, 'createApplicant').and.returnValue(throwError(() => ({ status: 404 })));
    spyOn(component, 'openDialog');

    component.registerApplicant(signupapplicant);
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalledWith('2');
  }));
});
