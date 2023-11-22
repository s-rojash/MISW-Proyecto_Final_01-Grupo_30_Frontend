import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConjuntoPruebasService } from './conjunto-pruebas.service';
import { Conjuntoprueba } from './conjuntoprueba';
import { environment } from 'src/environments/environment';

describe('ConjuntoPruebasService', () => {
  let injector: TestBed;
  let service: ConjuntoPruebasService;
  let httpMock: HttpTestingController;
  let apiUrl: string = environment.baseUrlBancoPreguntas;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConjuntoPruebasService]
    });

    injector = getTestBed();
    service = injector.get(ConjuntoPruebasService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle createConjuntoPruebas successful HTTP request (status code 200)', () => {
    const conjuntoprueba = {id : 1, bancoPreguntas: [], nombre : '', descripcion : ''};

    service.createConjuntoPruebas(conjuntoprueba).subscribe(data => {
      expect(data).toEqual(conjuntoprueba); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(apiUrl + '/pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(conjuntoprueba, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getCategorias failed HTTP request (status code 404)', () => {
    const conjuntoprueba = {id : 1, bancoPreguntas: [], nombre : '', descripcion : ''};

    service.createConjuntoPruebas(conjuntoprueba).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(apiUrl + '/pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });
});
