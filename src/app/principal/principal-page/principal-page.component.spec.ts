/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader, TranslateFakeLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrincipalPageComponent } from './principal-page.component';
import { ToastrModule } from 'ngx-toastr';
import { PrincipalService } from '../principal.service';
import { of } from 'rxjs';
import { CandidatoHabilidades } from '../candidato-habilidades';
import { Applicantskills } from '../../../app/applicant/applicantskills';
import { Signupapplicant } from '../../../app/signup/signupapplicant';
import { DialogapplicantskillsComponent } from '../dialogapplicantskills/dialogapplicantskills.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('PrincipalPageComponent', () => {
  let component: PrincipalPageComponent;
  let fixture: ComponentFixture<PrincipalPageComponent>;
  let principalService: PrincipalService;
  let pass2:string = "12345";

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          useClass: TranslateFakeLoader,
          deps: [HttpClient]
        }
        }),
        ToastrModule.forRoot({
          timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }),],
      declarations: [ PrincipalPageComponent, DialogapplicantskillsComponent ],
      providers: [PrincipalService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPageComponent);
    component = fixture.componentInstance;
    principalService = TestBed.inject(PrincipalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getApplicantSkills getApplicantSkills and return response success", waitForAsync(() => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const response: CandidatoHabilidades[] = [{id:1, candidato: signupapplicant, habilidad: applicantskill}];

    spyOn(principalService, 'getApplicantSkills').and.returnValue(of(response));

    component.getApplicantSkills();
    fixture.detectChanges();
    expect(component.applicantSkills.length).toBe(1);
  }));

  it("should call getApplicantSkills getApplicantSkills and return response empty", waitForAsync(() => {
    const response: CandidatoHabilidades[] = [];

    spyOn(principalService, 'getApplicantSkills').and.returnValue(of(response));

    component.getApplicantSkills();
    fixture.detectChanges();
    expect(component.applicantSkills.length).toBe(0);
  }));
});
