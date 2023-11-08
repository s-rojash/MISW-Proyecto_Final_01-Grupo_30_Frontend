import { TestBed } from '@angular/core/testing';
import { TeamService } from './team.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Team } from './team';
import { environment } from 'src/environments/environment';
import { Project } from '../project/project';
import { Profile } from '../profile/profile';

describe('Service: TeamService', () => {
  let service: TeamService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.baseUrlProyectos + '/equipos/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService],
    });

    service = TestBed.inject(TeamService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a team', () => {
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

    service.createTeam(newTeamData).subscribe((createdTeam) => {
      // Actualizamos el ID en el objeto después de la creación
      newTeamData.id = createdTeam.id;

      expect(createdTeam).toEqual(newTeamData);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newTeamData);
  });

  it('should get a list of teams', () => {
    const mockTeams: Team[] = [
      {
        id: 1,
        proyecto: new Project(1, 'Project 1', 'Description 1'),
        nombre: 'Team 1',
        perfil: new Profile(1, 'Profile 1'),
        cantidad: 0,
      },
      // Add more team objects
    ];

    service.getTeams().subscribe((teams) => {
      expect(teams).toEqual(mockTeams);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  it('should delete a team', () => {
    const teamId = '1';

    service.deleteTeam(teamId).subscribe(() => {
      // Aquí puedes agregar expectaciones apropiadas si es necesario.
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${teamId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update a team', () => {
    const updatedTeam: Team = {
      id: 1,
      proyecto: new Project(1, 'Updated Project', 'Updated Description'),
      nombre: 'Updated Team',
      perfil: new Profile(1, 'Updated Profile'),
      cantidad: 5,
    };

    service.updateTeam(updatedTeam).subscribe((resultTeam) => {
      expect(resultTeam).toEqual(updatedTeam);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${updatedTeam.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTeam);
  });

  it('should get teams by project', () => {
    const projectId = 1;
    const mockTeams: Team[] = [
      {
        id: 1,
        proyecto: new Project(1, 'Project 1', 'Description 1'),
        nombre: 'Team 1',
        perfil: new Profile(1, 'Profile 1'),
        cantidad: 0,
      },
      // Add more team objects
    ];

    service.getTeamsByProject(projectId).subscribe((teams) => {
      expect(teams).toEqual(mockTeams);
    });

    const req = httpTestingController.expectOne(`${apiUrl}proyecto/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeams);
  });

  /*it('should get teams by ID', () => {
    const teamId = 1;
    const mockTeam: Team = {
      id: 1,
      proyecto: new Project(1, 'Project 1', 'Description 1'),
      nombre: 'Team 1',
      perfil: new Profile(1, 'Profile 1'),
      cantidad: 0,
    };



    const req = httpTestingController.expectOne(`${apiUrl}${teamId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTeam);
  });*/

  afterEach(() => {
    httpTestingController.verify();
  });
});
