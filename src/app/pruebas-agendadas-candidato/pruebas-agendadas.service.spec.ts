/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PruebaAgendadaService } from './pruebas-agendadas.service';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: PruebaAgendadaService', () => {
  let UrlEntrevistas: string = environment.baseUrlEntrevistas;
  let httpMock: HttpTestingController;
  let pruebaAgendadaService: PruebaAgendadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, HttpClientTestingModule],
      providers: [pruebaAgendadaService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    pruebaAgendadaService = TestBed.inject(PruebaAgendadaService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should ...', inject([PruebaAgendadaService], (service: PruebaAgendadaService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle listarPruebasAsignadas successful HTTP request (status code 200)', () => {
    const idCandidato = 4;
    const resultado = [{ id: 1, idCandidato: 4, nombrePrueba: "Prueba", fecha: '2023-12-01', estado: "Asignada"}];

    pruebaAgendadaService.listarPruebasAsignadas(idCandidato).subscribe(data => {
      expect(data).toEqual(resultado); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlEntrevistas + '/agenda-pruebas/ListarAgendaPruebaCandidado/' + idCandidato); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(resultado, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

});
