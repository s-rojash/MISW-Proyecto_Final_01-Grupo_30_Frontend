import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApplicantSearchGetComponent } from './applicant-search-get.component';
import { SignupService } from 'src/app/signup/signup.service';
import { of } from 'rxjs';
import { Signupapplicant } from 'src/app/signup/signupapplicant';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list'; 
import { By } from '@angular/platform-browser';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

describe('ApplicantSearchGetComponent', () => {
  let component: ApplicantSearchGetComponent;
  let fixture: ComponentFixture<ApplicantSearchGetComponent>;
  let signupService: SignupService;


  const applicant = new Signupapplicant(
    1,           // id
    'John',      // nombres
    'Doe',       // apellidos
    'DNI',       // tipoDocumento
    123456789,   // numDocumento
    '123-456-789', // celular
    'johndoe@example.com', // email
    'password123' // password
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantSearchGetComponent],
      providers: [SignupService],
      imports: [
        HttpClientModule,
        MatCardModule,MatFormFieldModule,MatButtonModule,MatIconModule,
        MatInputModule,ReactiveFormsModule,MatListModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantSearchGetComponent);
    component = fixture.componentInstance;
    signupService = TestBed.inject(SignupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty selectedApplicants array', () => {
    expect(component.selectedApplicants).toEqual([]);
  });

  
  it('should toggle selection of an applicant', () => {
  
  
    component.toggleSelection(applicant);
    expect(component.isSelected(applicant)).toBe(true);
    component.toggleSelection(applicant);
    expect(component.isSelected(applicant)).toBe(false);
  });

  it('should call showApplicantDetails() when the "Search Applicant" button is clicked', () => {
    const showApplicantDetailsSpy = spyOn(component, 'showApplicantDetails');
    const button = fixture.debugElement.query(By.css('.button-search'));
    button.triggerEventHandler('click', null);
    expect(showApplicantDetailsSpy).toHaveBeenCalled();
  });
  
  it('should load applicants and set showApplicantInfo to true', () => {
    const applicants = [applicant];
    spyOn(signupService, 'getApplicant').and.returnValue(of(applicants));
  
    component.showApplicantDetails();
    expect(component.applicants).toEqual(applicants);
    expect(component.showApplicantInfo).toBe(true);
  });
  
});
