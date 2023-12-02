/* tslint:disable:no-unused-variable */
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { PrincipalService } from './principal.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { CandidatoHabilidades } from './candidato-habilidades';
import { Applicantskills } from '../applicant/applicantskills';
import { Signupapplicant } from '../signup/signupapplicant';
import { environment } from 'src/environments/environment';
import { Prueba } from '../banco-preguntas/prueba';
import { Pruebacandidato } from '../test/pruebacandidato';

describe('Service: Principal', () => {
  let httpMock: HttpTestingController;
  let principalService: PrincipalService;
  let Urlcandidatos: string = environment.baseUrl;
  let UrlPruebasCandidato: string = environment.baseUrlBancoPreguntas;
  let pass2 = '12345';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [PrincipalService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    principalService = TestBed.inject(PrincipalService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should ...', inject([PrincipalService], (service: PrincipalService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle getApplicantSkills successful HTTP request (status code 200)', waitForAsync(() => {
    localStorage.setItem("API_CANDIDATO_ID", "1");

    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const candidatoHabilidades: CandidatoHabilidades[] = [{id:1, candidato: signupapplicant, habilidad: applicantskill}];

    principalService.getApplicantSkills().subscribe(data => {
      expect(data).toEqual(candidatoHabilidades); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(Urlcandidatos + '/candidato-habilidades/candidatos/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(candidatoHabilidades, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  }));

  it('should handle getApplicantSkills failed HTTP request (status code 404)', waitForAsync(() => {
    localStorage.setItem("API_CANDIDATO_ID", "1");

    principalService.getApplicantSkills().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(Urlcandidatos + '/candidato-habilidades/candidatos/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  }));

  it('should handle getPruebasCandidato successful HTTP request (status code 200)', waitForAsync(() => {
    localStorage.setItem("API_CANDIDATO_ID", "1");
    const date = new Date('10/28/2023');
    const prueba: Prueba = {id: 1, nombre: 'Prueba', descripcion: 'prueba des', bancosPreguntas: []};
    const response: Pruebacandidato[] = [{ id: 0, idCandidato: 1, prueba: prueba, puntaje: 0, estado: 'Pendiente', fechaPresentacion: date }];

    principalService.getPruebasCandidato().subscribe(data => {
      expect(data).toEqual(response); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlPruebasCandidato + '/pruebas-candidato/candidato/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(response, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  }));

  it('should handle getPruebasCandidato failed HTTP request (status code 404)', waitForAsync(() => {
    localStorage.setItem("API_CANDIDATO_ID", "1");

    principalService.getPruebasCandidato().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlPruebasCandidato + '/pruebas-candidato/candidato/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  }));
});
