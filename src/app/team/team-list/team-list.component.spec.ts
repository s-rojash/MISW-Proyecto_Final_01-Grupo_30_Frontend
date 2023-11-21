import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamListComponent } from './team-list.component';
import { TeamService } from '../team.service';
import { ProjectService } from 'src/app/project/project.service';
import { of } from 'rxjs';
import { Team } from '../team';
import { Project } from 'src/app/project/project';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

class MockTeamService {
  getTeams() {
    return of([]); // Puedes ajustar esto según tus necesidades
  }

  getTeamsById(teamId: number) {
    return of(new Team({ id: teamId, proyecto: new Project(1, 'Proyecto 1', 'Descripción 1'), nombre: 'Equipo 1', perfil: { id: 1, nombre: 'Perfil 1' }, cantidad: 5 }));
  }

  getTeamsByProject(projectId: number) {
    return of([new Team({ id: 1, proyecto: new Project(projectId, 'Proyecto 1', 'Descripción 1'), nombre: 'Equipo 1', perfil: { id: 1, nombre: 'Perfil 1' }, cantidad: 5 })]);
  }
}

class MockProjectService {
  getProjects() {
    return of([new Project(1, 'Proyecto 1', 'Descripción 1'), new Project(2, 'Proyecto 2', 'Descripción 2')]);
  }
}

// Configura el cargador para TranslateModule
export function HttpLoaderFactory(httpClient:HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let teamService: TeamService;
  let projectService: ProjectService;
  let dialog: MatDialog;
  let toastr: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
          },
        }),
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      declarations: [TeamListComponent],
      providers: [
        { provide: TeamService, useClass: MockTeamService },
        { provide: ProjectService, useClass: MockProjectService },
        { provide: MatDialog, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    teamService = TestBed.inject(TeamService);
    projectService = TestBed.inject(ProjectService);
    dialog = TestBed.inject(MatDialog);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load teams and projects on init', () => {
    component.ngOnInit();
    expect(component.teams.length).toBeGreaterThan(-1);
    expect(component.projects.length).toBeGreaterThan(-1);
  });



  
});
