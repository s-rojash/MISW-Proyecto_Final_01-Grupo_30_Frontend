/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApplicantSkillsComponent } from './applicant-skills.component';
import { Applicantskills } from '../applicantskills';
import { CandidatoHabilidades } from '../../../app/principal/candidato-habilidades';
import { Signupapplicant } from '../../../app/signup/signupapplicant';
import { ApplicantService } from '../applicant.service';
import { of } from 'rxjs';
import { Applicant } from '../applicant';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ApplicantSkillsComponent', () => {
  let component: ApplicantSkillsComponent;
  let fixture: ComponentFixture<ApplicantSkillsComponent>;
  let translate: jasmine.SpyObj<TranslateService>;
  let pass2 = '12345';
  let applicantService: ApplicantService;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports: [
        MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, MatListModule, MatCheckboxModule, FormsModule,
        HttpClientTestingModule,
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
        }),
      ],
      declarations: [ ApplicantSkillsComponent ],
      providers: [ToastrService, ApplicantService, TranslateService, { provide: ToastrService, useValue: spy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantSkillsComponent);
    component = fixture.componentInstance;
    applicantService = TestBed.inject(ApplicantService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disabled button with the skills list empty', () => {
    expect(component.isButtonDisabled()).toBe(true);
  });

  it('should enabled button with the skills list fill', () => {
    const applicantskills: Applicantskills[] = [{id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'}];
    component.selectedOptionstehnical = applicantskills;
    fixture.detectChanges();
    expect(component.isButtonDisabled()).toBe(false);
  });

  it('should response true value for check valid', () => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const candidatoHabilidades: CandidatoHabilidades[] = [{id:1, candidato: signupapplicant, habilidad: applicantskill}];

    component.savedskills = candidatoHabilidades;
    fixture.detectChanges();
    expect(component.isCheck(1)).toBe(true);
  });

  it('should response true value for check valid', () => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const candidatoHabilidades: CandidatoHabilidades[] = [{id:1, candidato: signupapplicant, habilidad: applicantskill}];

    component.savedskills = candidatoHabilidades;
    fixture.detectChanges();
    expect(component.isCheck(2)).toBe(false);
  });

  it("should call getSaveSkills getcandidatohabilidadesByCandidato and return response success", waitForAsync(() => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const response: CandidatoHabilidades[] = [{id:1, candidato: signupapplicant, habilidad: applicantskill}];

    spyOn(applicantService, 'getcandidatohabilidadesByCandidato').and.returnValue(of(response));

    component.getSaveSkills();
    fixture.detectChanges();
    expect(component.savedskills.length).toBe(1);
  }));

  it("should call getApplicant getApplicant and return response success", waitForAsync(() => {
    const date = new Date('10/28/2023');
    const date2 = new Date('10/28/2023');

    const response: Applicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2,
          token: "sdasda", expireAt: date, createdAt: date2 };

    spyOn(applicantService, 'getApplicant').and.returnValue(of(response));

    component.getApplicant();
    fixture.detectChanges();
    expect(component.applicant).toBe(response);
  }));

  it("should call saveSkills and return response success", waitForAsync(() => {
    component.saveSkills();
    fixture.detectChanges();
    expect(toastrSpy.success).toHaveBeenCalled();
  }));

  it("should call getSkills getSoftSkills and return response success", waitForAsync(() => {
    const response: Applicantskills[] = [{id: 1, tipoHabilidad: 'Blandas', habilidad: 'SQL', habilidad_en: 'SQL'}];

    spyOn(applicantService, 'getSoftSkills').and.returnValue(of(response));

    component.getSkills();
    fixture.detectChanges();
    expect(component.softability.length).toBe(1);
  }));

  it("should call getSkills getTechnicalSkills and return response success", waitForAsync(() => {
    const response: Applicantskills[] = [{id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'}];

    spyOn(applicantService, 'getTechnicalSkills').and.returnValue(of(response));

    component.getSkills();
    fixture.detectChanges();
    expect(component.tehnicalskills.length).toBe(1);
  }));

  it("should call getSkills getProfessionalSkills and return response success", waitForAsync(() => {
    const response: Applicantskills[] = [{id: 1, tipoHabilidad: 'Profesionales', habilidad: 'ingles', habilidad_en: 'english'}];

    spyOn(applicantService, 'getProfessionalSkills').and.returnValue(of(response));

    component.getSkills();
    fixture.detectChanges();
    expect(component.spefifications.length).toBe(1);
  }));
});
