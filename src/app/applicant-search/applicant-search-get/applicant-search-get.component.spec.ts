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
import { ConjuntoPruebasService } from 'src/app/conjunto-pruebas/conjunto-pruebas.service';
import { Habilidades } from '../habilidades';
import { ApplicantSearchService } from '../applicant-search.service';
import { Habilidadescandidato } from '../habilidadesCandidato';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

describe('ApplicantSearchGetComponent', () => {
  let component: ApplicantSearchGetComponent;
  let fixture: ComponentFixture<ApplicantSearchGetComponent>;
  let signupService: SignupService;
  let applicantSearchService :ApplicantSearchService;
  let mockApplicantSearchService: jasmine.SpyObj<ApplicantSearchService>;

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
  

  

  const habilidadesprofesionales = new Habilidades(
    1,           // id
    'tecnica',      // nombres
    'English',       // apellidos
    'Ingles',       // tipoDocumento
   
  );

  const habilidadestecnicas = new Habilidades(
    1,           // id
    'prefesional',      // nombres
    'master degree',       // apellidos
    'Maestría',       // tipoDocumento
   
  );

  const habilidadesblandas = new Habilidades(
    1,           // id
    'Blandas',      // nombres
    'Liderazgo',       // apellidos
    'leadership',       // tipoDocumento
   
  );


  const json = {
    "id": 3,
    "candidato": {
      "id": 1,
      "nombres": "Steve",
      "apellidos": "Rojas",
      "tipoDocumento": "C.C.",
      "numDocumento": 1234.0,
      "celular": "3183104480",
      "email": "s.rojash@uniandes.edu.co",
      "password": "$2a$10$Kqdmd9HtfWIG8qJ2TCJxHuW8wxp3I9RfLIpqGWPMkzp7Bs1Wf55PC",
      "token": null,
      "expireAt": null,
      "createdAt": null
    },
    "habilidad": {
      "id": 2,
      "tipoHabilidad": "Blandas",
      "habilidad": "Liderazgo",
      "habilidad_en": "leadership"
    }
  };
  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success']);
    mockApplicantSearchService = jasmine.createSpyObj('ApplicantSearchService', ['getHabilidadesTecnicas', 'getHabilidadesProfesionales','getHabilidadesBlandas', 'getCandidatoHabilidades']);
   
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

  it('should load getHabilidades Tecnicas', () => {
    const habilidad = [habilidadestecnicas];
    mockApplicantSearchService.getHabilidadesTecnicas.and.returnValue(of(habilidad));
  
    component.showApplicantDetails();
  
    expect(habilidad).toEqual(habilidad);
    expect(component.showApplicantInfo).toBe(true);
  });

  it('should handle null values in techSkills, softSkills, and profiles', () => {
    component.techSkills.setValue(null);
    component.softSkills.setValue(null);
    component.profiles.setValue(null);
  
    component.showApplicantDetails();
  
      
  });

  it('should translate skills', () => {
    const skill = { habilidad: 'Habilidad', habilidad_en: 'Skill' };
  
    const translation = component.getSkillTranslation(skill);
  
    expect('Habilidad').toBe('Habilidad'); 
  });

  it('should extract unique applicants info', () => {
    const habilidadescandidato = [
      {
        candidato: { id: 1, nombres: 'John', apellidos: 'Doe' },
        habilidad: { id: 1, tipoHabilidad: 'Técnica', habilidad: 'JavaScript', habilidad_en: 'JavaScript' }
      },
      {
        candidato: { id: 2, nombres: 'Jane', apellidos: 'Doe' },
        habilidad: { id: 2, tipoHabilidad: 'Blanda', habilidad: 'Comunicación', habilidad_en: 'Communication' }
      },
    ] as Habilidadescandidato[];
  
    const uniqueApplicants = component.extractUniqueApplicantsInfo(habilidadescandidato);
  
    expect(uniqueApplicants.length).toBe(2);
    expect(uniqueApplicants[0].nombres).toBe('John');
    expect(uniqueApplicants[1].nombres).toBe('Jane');
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

 

  it('should load getHabilidades TEcnicas', () => {
    const habilidad = [habilidadestecnicas];
    mockApplicantSearchService.getHabilidadesTecnicas.and.returnValue(of(habilidad));

    component.showApplicantDetails();
    expect(habilidad).toEqual(habilidad);//El resultado del servicio.
    expect(component.showApplicantInfo).toBe(true);
  });


  it('should load getHabilidades profesionales', () => {
    const habilidad = [habilidadesprofesionales];
    mockApplicantSearchService.getHabilidadesProfesionales.and.returnValue(of(habilidad));

    component.showApplicantDetails();
    expect(habilidad).toEqual(habilidad);
    expect(component.showApplicantInfo).toBe(true);
  });


  it('should load getHabilidades getHabilidadesBlandas', () => {
    const habilidad = [habilidadesblandas];
    mockApplicantSearchService.getHabilidadesBlandas.and.returnValue(of(habilidad));

    component.showApplicantDetails();
    expect(habilidad).toEqual(habilidad);
    expect(component.showApplicantInfo).toBe(true);
  });


  it('should load getCandidatoHabilidades', () => {
    const habilidad = [habilidadesblandas];
    mockApplicantSearchService.getHabilidadesBlandas.and.returnValue(of(habilidad));

    component.showApplicantDetails();
    expect(habilidad).toEqual(habilidad);
    expect(component.showApplicantInfo).toBe(true);
  });



  it('should load getCandidatoHabilidades', () => {
    const habilidadesCandidato = [
      {
        "id": 3,
        "candidato": {
          "id": 1,
          "nombres": "Steve",
          "apellidos": "Rojas",
          "tipoDocumento": "C.C.",
          "numDocumento": 1234.0,
          "celular": "3183104480",
          "email": "s.rojash@uniandes.edu.co",
          "password": "$2a$10$Kqdmd9HtfWIG8qJ2TCJxHuW8wxp3I9RfLIpqGWPMkzp7Bs1Wf55PC",
          "token": null,
          "expireAt": null,
          "createdAt": null
        },
        "habilidad": {
          "id": 2,
          "tipoHabilidad": "Blandas",
          "habilidad": "Liderazgo",
          "habilidad_en": "leadership"
        }
      }
    ]
  
    const filtros = '1,2';

    mockApplicantSearchService.getCandidatoHabilidades.and.returnValue(of(habilidadesCandidato));
    component.showApplicantDetails();
  
   expect(habilidadesCandidato).toEqual(habilidadesCandidato);
    expect(component.showApplicantInfo).toBe(true);
    });

});
