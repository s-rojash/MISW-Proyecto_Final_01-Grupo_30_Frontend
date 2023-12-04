/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController,HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from './project';
import { environment } from 'src/environments/environment';


describe('Service: Project', () => {
  let service: ProjectService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a project', () => {
    const project: Project = {
      idEmpresa: undefined,
      nombre: '',
      descripcion: '',
      editable: false,
      id: 0
    };

    service.createProject(project).subscribe((createdProject) => {
      expect(createdProject).toEqual(project);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrlProyectos}/proyectos/`);
    expect(req.request.method).toEqual('POST');
    req.flush(project);
  });

  it('should handle HTTP errors when creating a project', () => {
    const project: Project = {
      idEmpresa: undefined,
      nombre: '',
      descripcion: '',
      editable: false,
      id: 0
    };

    const errorMessage = 'Error creating project';
    service.createProject(project).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(`${environment.baseUrlProyectos}/proyectos/`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });


  it('should ...', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
  it('should get all projects', () => {
    const mockProjects: Project[] = [
        {
          idEmpresa: undefined,
          nombre: '',
          descripcion: '',
          editable: false,
          id: 0
        }
    ];

    service.getProjects().subscribe((projects) => {
        expect(projects).toEqual(mockProjects);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrlProyectos}/proyectos/`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProjects);
    });


    it('should update a project', () => {
      const mockProject: Project = {
         idEmpresa: undefined,
         nombre: '',
         descripcion: '',
         editable: false,
         id: 0
      };
     
      service.updateProject(mockProject).subscribe((updatedProject) => {
         expect(updatedProject).toEqual(mockProject);
      });
     
      const req = httpTestingController.expectOne(`${environment.baseUrlProyectos}/proyectos/`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockProject);
     });

     

  
});
