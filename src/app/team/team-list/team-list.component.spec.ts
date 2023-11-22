/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TeamListComponent } from './team-list.component';
import { MatSelectModule } from '@angular/material/select';
import { TeamService } from '../team.service';
import { of } from 'rxjs';
import { Team } from '../team';
import { TeamAssignComponent } from '../team-assign/team-assign.component';

// ... otras importaciones

TestBed.configureTestingModule({
  imports: [
    MatSelectModule,
  ],
  declarations: [TeamListComponent, TeamAssignComponent],
}).compileComponents();


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let teamService: TeamService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,MatSelectModule, HttpClientTestingModule, FormsModule,
        MatTableModule,
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
      declarations: [ TeamListComponent, TeamAssignComponent ],
      providers: [TeamService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    teamService = TestBed.inject(TeamService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the method onProjectSelectionChange teamForm get project property null', () => {
    component.onProjectSelectionChange();
    fixture.detectChanges();
    expect(component.teams).toHaveSize(0);
  });

  it('should call getTeamsByProject when a project is selected', () => {
    const newTeamsData: Team[] = [{
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
    }];
    // Arrange
    const selectedProjectId = '1';
    const selectedProjectControl = component.teamForm.get('project');
    selectedProjectControl?.setValue(selectedProjectId);

    spyOn(teamService, 'getTeamsByProject').and.returnValue(of(newTeamsData));
    component.onProjectSelectionChange();
    fixture.detectChanges();
    expect(component.teams).toEqual(newTeamsData);
  });

  it('should clear the teams when no project is selected', () => {
    const selectedProjectControl = component.teamForm.get('project');
    selectedProjectControl?.setValue(null);

    // Act
    component.onProjectSelectionChange();
    fixture.detectChanges();
    expect(component.teams).toEqual([]);
  });

  it('should call getTeamsById when a team is selected', () => {
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
    const selectedTeamId = 1;
    const selectedTeamControl = component.teamForm.get('team');
    selectedTeamControl?.setValue(selectedTeamId);
    spyOn(teamService, 'getTeamsById').and.returnValue(of(newTeamData));
    component.onTeamSelectionChange();

    fixture.detectChanges();
    expect(teamService.getTeamsById).toHaveBeenCalledWith(1);
    expect(component.teamDetails).toEqual(newTeamData);
  });
});
