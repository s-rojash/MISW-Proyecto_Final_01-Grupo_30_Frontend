import { TestBed } from '@angular/core/testing';
import { TeamService } from './team.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Team } from './team';
import { environment } from 'src/environments/environment';
import { Project } from '../project/project';
import { Profile } from '../profile/profile';
import { TeamAssign } from './team-assign';

describe('Service: TeamService', () => {
  let service: TeamService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.baseUrlProyectos + '/equipos/';
  const apiUrlasignarequipo: string = environment.baseUrlProyectos + '/asignar-equipo/';

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

  it('should handle createAssignTeam successful HTTP request (status code 200)', () => {
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
    const teamAssign:TeamAssign = { id:0, equipo: newTeamData, idCandidato: 1 };

      service.createAssignTeam(teamAssign).subscribe(data => {
      expect(data).toEqual(teamAssign); // Assert that the response data matches the expected data
    });

    const req = httpTestingController.expectOne(apiUrlasignarequipo); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(teamAssign, { status: 201, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle createAssignTeam failed HTTP request (status code 404)', () => {
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
    const teamAssign:TeamAssign = { id:0, equipo: newTeamData, idCandidato: 1 };

    service.createAssignTeam(teamAssign).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpTestingController.expectOne(apiUrlasignarequipo); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getAllAssignTeam successful HTTP request (status code 200)', () => {
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
    const teamsAssign:TeamAssign[] = [{ id:1, equipo: newTeamData, idCandidato: 1 }];

      service.getAllAssignTeam().subscribe(data => {
      expect(data).toEqual(teamsAssign); // Assert that the response data matches the expected data
    });

    const req = httpTestingController.expectOne(apiUrlasignarequipo); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(teamsAssign, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getAllAssignTeam failed HTTP request (status code 404)', () => {
    service.getAllAssignTeam().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpTestingController.expectOne(apiUrlasignarequipo); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle deleteAssignTeam successful HTTP request (status code 204)', () => {
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
    const teamAssign:TeamAssign = { id:1, equipo: newTeamData, idCandidato: 1 };

      service.deleteAssignTeam(teamAssign.id).subscribe(data => {
      expect(data).toEqual(teamAssign); // Assert that the response data matches the expected data
    });

    const req = httpTestingController.expectOne(apiUrlasignarequipo + teamAssign.id); // Expect a single request to this URL
    expect(req.request.method).toBe('DELETE'); // Assert that the request method is GET

    req.flush(teamAssign, { status: 204, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle deleteAssignTeam failed HTTP request (status code 404)', () => {
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
    const teamAssign:TeamAssign = { id:1, equipo: newTeamData, idCandidato: 1 };

    service.deleteAssignTeam(teamAssign.id).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpTestingController.expectOne(apiUrlasignarequipo + teamAssign.id); // Expect a single request to this URL
    expect(req.request.method).toBe('DELETE'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
