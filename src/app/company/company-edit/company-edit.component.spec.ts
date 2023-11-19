import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CompanyEditComponent } from './company-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Signupcompany } from 'src/app/signup/signupcompany';
import { CompanyService } from '../company.service';
import { DialogalertopcompComponent } from 'src/app/signup/dialogalertopcomp/dialogalertopcomp.component';

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
    // Provide a mock implementation of createCompany
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
  let dialog: MatDialog;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
      declarations: [CompanyEditComponent],
      providers: [
        { provide: CompanyService, useClass: MockCompanyService },
        { provide: MatDialog, useValue: {} },
        FormBuilder,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('go to open dialog success', () => {
    spyOn(component, 'openDialog');
    component.openDialog('3');
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('go to open dialog failed', () => {
    spyOn(component, 'openDialog');
    component.openDialog('4');
    expect(component.openDialog).toHaveBeenCalled();
  });



  it('should set selectedtypeNIT on selectChangeHandler', () => {
    const event = { target: { value: 'New Value' } };
    component.selectChangeHandler(event);
    expect(component.selectedtypeNIT).toBe('New Value');
  });




});
