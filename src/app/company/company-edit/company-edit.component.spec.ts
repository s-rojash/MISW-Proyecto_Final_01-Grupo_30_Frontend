import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CompanyEditComponent } from './company-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { Signupcompany } from 'src/app/signup/signupcompany';
import { CompanyService } from '../company.service';

class MockCompanyService {
  getCompany(): Observable<Signupcompany> {
    return of({
      id: 1,
      razonSocial: 'Company Test',
      tipoDocumento: 'NIT',
      numDocumento: 12345,
      digitoVerificacion: 6,
      email: 'test@example.com',
      password: 'password'
    });
  }

  createCompany(signupcompany: Signupcompany): Observable<Signupcompany> {
    return of(signupcompany);
  }
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('CompanyEditComponent', () => {
  let component: CompanyEditComponent;
  let fixture: ComponentFixture<CompanyEditComponent>;
  let companyService: CompanyService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const signupCompanyData = {
    razonSocial: 'Empresa de prueba',
    tipoDocumento: 'NIT',
    numDocumento: 12345,
    digitoVerificacion: 0,
    email : 'empresa1@empresa1.com',
    id: '2',
    password: 12345,
  };

  const signupCompanyObject = new Signupcompany(
    signupCompanyData.razonSocial,
    signupCompanyData.tipoDocumento,
    signupCompanyData.numDocumento,
    signupCompanyData.digitoVerificacion,
    signupCompanyData.email,
    signupCompanyData.password,
    signupCompanyData.id

    
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [CompanyEditComponent],
      providers: [
        FormBuilder,
        { provide: CompanyService, useClass: MockCompanyService },
        // Usa MatDialogRef<any> ya que no conocemos el tipo exacto de la instancia de MatDialogRef
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialogConfig, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService);

    // Crea un objeto espía manualmente con los métodos necesarios
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form data when a new company is received', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const companyForm = component.companyRForm;
    expect(companyForm.get('id')?.value).toEqual(1);
    expect(companyForm.get('razonSocial')?.value).toEqual(null);
    expect(companyForm.get('tipoDocumento')?.value).toEqual('NIT');
    expect(companyForm.get('numDocumento')?.value).toEqual(null);
    expect(companyForm.get('digitoVerificacion')?.value).toEqual(null);
    expect(companyForm.get('email')?.value).toEqual(null);
    expect(companyForm.get('password')?.value).toEqual(null);
  });



  it('should update selectedtypeNIT on selectChangeHandler', () => {
    const event = { target: { value: 'New Value' } };
    component.selectChangeHandler(event);
    expect(component.selectedtypeNIT).toBe('New Value');
  });

  it('should initialize companyRForm', () => {
    component.initForm();
    const companyForm = component.companyRForm;
    expect(companyForm.get('razonSocial')).toBeTruthy();
  });

  it('should set selectedtypeNIT on selectChangeHandler', () => {
    const event = { target: { value: 'New Value' } };
    component.selectChangeHandler(event);
    expect(component.selectedtypeNIT).toBe('New Value');
  });

  
});
