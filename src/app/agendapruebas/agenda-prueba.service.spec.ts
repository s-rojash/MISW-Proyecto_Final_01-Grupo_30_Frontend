/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AgendaPruebaService } from './agenda-prueba.service';
import { Candidato } from './candidato';

describe('Service: AgendaPrueba', () => {
  let UrlBancoPreguntas: string = environment.baseUrlBancoPreguntas;
  let UrlCandidatos: string = environment.baseUrl;
  let httpMock: HttpTestingController;
  let agendaPruebaService: AgendaPruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, HttpClientTestingModule],
      providers: [AgendaPruebaService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    agendaPruebaService = TestBed.inject(AgendaPruebaService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should ...', inject([AgendaPruebaService], (service: AgendaPruebaService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle getListaAgendaPrueba successful HTTP request (status code 200)', () => {
    const date = new Date('10/28/2023');
    const agendapruebas = [{ id: 1, idEmpresa: 1, idCandidato: 1, idPrueba: 1, fecha: date, puntos: 5, estado: 'pendiente' }];

    agendaPruebaService.getListaAgendaPrueba().subscribe(data => {
      expect(data).toEqual(agendapruebas); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/agendar-pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(agendapruebas, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getListaAgendaPrueba failed HTTP request (status code 404)', () => {
    agendaPruebaService.getListaAgendaPrueba().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/agendar-pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getAgendaPrueba successful HTTP request (status code 200)', () => {
    const date = new Date('10/28/2023');
    const agendaprueba = { id: 1, idEmpresa: 1, idCandidato: 1, idPrueba: 1, fecha: date, puntos: 5, estado: 'pendiente' };

    agendaPruebaService.getAgendaPrueba(1).subscribe(data => {
      expect(data).toEqual(agendaprueba); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/agendar-pruebas/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(agendaprueba, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getAgendaPrueba failed HTTP request (status code 404)', () => {
    agendaPruebaService.getAgendaPrueba(1).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/agendar-pruebas/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle saveListaAgendaPrueba successful HTTP request (status code 200)', () => {
    const date = new Date('10/28/2023');
    const agendaprueba = { id: 1, idEmpresa: 1, idCandidato: 1, idPrueba: 1, fecha: date, puntos: 5, estado: 'pendiente' };

    agendaPruebaService.saveListaAgendaPrueba(agendaprueba).subscribe(data => {
      expect(data).toEqual(agendaprueba); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/agendar-pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(agendaprueba, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle saveListaAgendaPrueba failed HTTP request (status code 404)', () => {
    const date = new Date('10/28/2023');
    const agendaprueba = { id: 1, idEmpresa: 1, idCandidato: 1, idPrueba: 1, fecha: date, puntos: 5, estado: 'pendiente' };

    agendaPruebaService.saveListaAgendaPrueba(agendaprueba).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/agendar-pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getListaCandidatos successful HTTP request (status code 200)', () => {
    const candidatos: Candidato[] = [{id: 1, numDocumento: 3212, apellidos: '1213', nombres: 'dfdfd', email: 'sdfsd', celular: '2111'}];

    agendaPruebaService.getListaCandidatos().subscribe(data => {
      expect(data).toEqual(candidatos); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidatos/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(candidatos, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getListaCandidatos failed HTTP request (status code 404)', () => {
    agendaPruebaService.getListaCandidatos().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidatos/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });
});
