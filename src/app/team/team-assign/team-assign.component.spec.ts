/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TeamAssignComponent } from './team-assign.component';
import { of } from 'rxjs';
import { TeamService } from '../team.service';
import { SignupService } from 'src/app/signup/signup.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';
import { Team } from '../team';
import { TeamAssign } from '../team-assign';

TestBed.configureTestingModule({
  imports: [
    MatSelectModule,
  ],
  declarations: [TeamAssignComponent],
}).compileComponents();

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('TeamAssignComponent', () => {
  let component: TeamAssignComponent;
  let fixture: ComponentFixture<TeamAssignComponent>;
  let teamServiceSpy: jasmine.SpyObj<TeamService>;
  let signupService: SignupService;
  let toastrService: ToastrService;
  let pass2 = '12345';

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('TeamService', ['getAllAssignTeam']);

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,MatSelectModule, FormsModule, MatTableModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
        }),
        ToastrModule.forRoot({
          timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      })],
      declarations: [ TeamAssignComponent ],
      providers: [{ provide: TeamService, useValue: spy }, SignupService, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAssignComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    teamServiceSpy = TestBed.inject(TeamService) as jasmine.SpyObj<TeamService>;
    signupService = TestBed.inject(SignupService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test call add to table button', () => {
    spyOn(component, 'addApplicantToTable');
    let elements = fixture.nativeElement.querySelectorAll('button[type="submit"]');
    elements[0].click();
    fixture.detectChanges();
    expect(component.addApplicantToTable).toHaveBeenCalled();
  });

  it('test call assign applicants button', () => {
    component.validatelenght = true;
    fixture.detectChanges();
    spyOn(component, 'assignApplicants');
    let elements = fixture.nativeElement.querySelectorAll('button[type="submit"]');
    console.log(elements);
    elements[1].click();
    fixture.detectChanges();
    expect(component.assignApplicants).toHaveBeenCalled();
  });

  it("should call getApplicants getApplicant and return response success", () => {
    const newTeamData: Team = {
      proyecto: {
        id: 14,
        idEmpresa: undefined,
        nombre: '',
        descripcion: '',
        editable: false,
      },
      nombre: 'Equipo 1',
      perfil: {
        id: 1,
        nombre: '',
      },
      cantidad: 3,
      id: -1, // ID temporal para la prueba
    };
    component.team = newTeamData;
    fixture.detectChanges();
    let response:Signupapplicant[] = [{ id: 1, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
    numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 }];

    spyOn(signupService, 'getApplicant').and.returnValue(of(response));
    spyOn(component, 'getApplicantsAssigns');

    component.getApplicants();
    fixture.detectChanges();
    expect(component.getApplicantsAssigns).toHaveBeenCalled();
  });

  it('should update validateLength when dataSource is not empty', () => {
    const signupapplicant: Signupapplicant = { id: 1, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
           numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };

    component.selectedApplicant = signupapplicant;
    component.dataSource = [{ id: 0, idcandidato: 1, candidato: 'John Doe', especialidad: 'Some Specialization' }];
    component.addApplicantToTable();
    fixture.detectChanges();
    expect(component.validatelenght).toBe(true);
  });

  it('should not update validateLength when dataSource is empty', () => {
    component.dataSource = [];

    component.addApplicantToTable();
    fixture.detectChanges();
    expect(component.validatelenght).toBe(false);
  });

  it('should not add applicant to table when selectedApplicant is already in dataSource', () => {
    const newTeamData: Team = {
      proyecto: {
        id: 14,
        idEmpresa: undefined,
        nombre: '',
        descripcion: '',
        editable: false,
      },
      nombre: 'Equipo 1',
      perfil: {
        id: 1,
        nombre: '',
      },
      cantidad: 3,
      id: -1, // ID temporal para la prueba
    };
    const signupapplicant: Signupapplicant = { id: 1, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
           numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };

    component.selectedApplicant = signupapplicant;
    component.dataSource = [{ id: 0, idcandidato: 1, candidato: 'John Doe', especialidad: 'Some Specialization' }];
    component.team = newTeamData;

    component.addApplicantToTable();
    fixture.detectChanges();
    expect(component.dataSource.length).toBe(1);
  });

  it('should not add applicant to table when selectedApplicant is falsy', () => {
    component.selectedApplicant = null;
    component.addApplicantToTable();
    fixture.detectChanges();
    expect(component.dataSource.length).toBe(0);
  });

  it('should add applicant to table when selectedApplicant is truthy and not in dataSource', () => {
    const newTeamData: Team = {
      proyecto: {
        id: 14,
        idEmpresa: undefined,
        nombre: '',
        descripcion: '',
        editable: false,
      },
      nombre: 'Equipo 1',
      perfil: {
        id: 1,
        nombre: '',
      },
      cantidad: 3,
      id: -1, // ID temporal para la prueba
    };
    const signupapplicant: Signupapplicant = { id: 1, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
           numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };

    component.selectedApplicant = signupapplicant;
    component.team = newTeamData;

    component.addApplicantToTable();
    fixture.detectChanges();
    expect(component.dataSource.length).toBe(1);
  });

  it('should call deleteRecord with a datasourceSave empty', () => {
    spyOn(component, 'deleteRow');
    let row:any = {id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'};
    component.deleteRecord(row);
    fixture.detectChanges();
    expect(component.deleteRow).toHaveBeenCalled();
  });

  it('should call deleteRecord with datasourceSave fill and datasource length > 1', () => {
    spyOn(component, 'deleteRow');
    component.dataSourceSave = [{id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'}];
    component.dataSource = [{id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'},{id: 2, idcandidato: 2, candidato: 'Brayan', especialidad: 'QA'}];
    let row:any = {id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'};
    component.deleteRecord(row);
    fixture.detectChanges();
    expect(component.deleteRow).toHaveBeenCalled();
  });

  it('should call deleteRecord show error message when dataSource has only one item', () => {
    spyOn(toastrService, 'error');
    component.dataSourceSave = [{id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'}];
    component.dataSource = [{id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'}];
    let row:any = {id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'};
    component.deleteRecord(row);
    fixture.detectChanges();
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('should call deleteRow and delete the row selected', () => {
    let row:any = {id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'};
    component.dataSource = [{id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'},{id: 2, idcandidato: 2, candidato: 'Brayan', especialidad: 'QA'}];
    component.deleteRow(row);
    fixture.detectChanges();
    expect(component.dataSource).toHaveSize(1);
    expect(component.dataSource[0].idcandidato).toEqual(2);
  });

  it('should call deleteRow with a row not exists in the datasource', () => {
    let row:any = {id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'};
    component.dataSource = [{id: 2, idcandidato: 2, candidato: 'Brayan', especialidad: 'QA'},{id: 3, idcandidato: 3, candidato: 'Oscar', especialidad: 'QA'}];
    component.deleteRow(row);
    fixture.detectChanges();
    expect(component.dataSource).toHaveSize(2);
    expect(component.dataSource[1].idcandidato).toEqual(3);
  });

  it('should call deleteRow and change validatelenght variable to true', () => {
    let row:any = {id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'};
    component.dataSource = [{id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'},{id: 2, idcandidato: 2, candidato: 'Brayan', especialidad: 'QA'}];
    component.deleteRow(row);
    fixture.detectChanges();
    expect(component.validatelenght).toBe(true);
  });

  it('should call deleteRow and change validatelenght variable to false', () => {
    let row:any = {id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'};
    component.dataSource = [{id: 1, idcandidato: 1, candidato: 'Steve', especialidad: 'QA'}];
    component.deleteRow(row);
    fixture.detectChanges();
    expect(component.validatelenght).toBe(false);
  });

  it('should populate dataSource and dataSourceSave when teamsAssign has data', fakeAsync(() => {
    const newTeamData: Team = {
      proyecto: {
        id: 14,
        idEmpresa: undefined,
        nombre: '',
        descripcion: '',
        editable: false,
      },
      nombre: 'Equipo 1',
      perfil: {
        id: 1,
        nombre: 'QA',
      },
      cantidad: 3,
      id: -1, // ID temporal para la prueba
    };
    const mockTeamsAssign = [
      {id:1, equipo: newTeamData, idCandidato: 1},
      {id:2, equipo: newTeamData, idCandidato: 2}
    ];
    const mockApplicants = [
      { id: 1, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
           numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 },
      { id: 2, nombres: "Brayan", apellidos: "Hernandez", tipoDocumento: "C.C.",
      numDocumento: 1234, celular: "3183104480", email: "b.h@uniandes.edu.co", password: pass2 }
    ];

    teamServiceSpy.getAllAssignTeam.and.returnValue(of(mockTeamsAssign));
    component.applicants = mockApplicants;
    component.team = newTeamData;

    component.getApplicantsAssigns();
    tick(); // Simulate asynchronous behavior

    expect(component.dataSource.length).toBe(2);
    expect(component.dataSource[0].candidato).toBe('Steve Rojas');
    expect(component.dataSource[0].especialidad).toBe('QA');
    expect(component.dataSource[1].candidato).toBe('Brayan Hernandez');
    expect(component.dataSource[1].especialidad).toBe('QA');
    expect(component.dataSourceSave.length).toBe(2);
  }));
});
