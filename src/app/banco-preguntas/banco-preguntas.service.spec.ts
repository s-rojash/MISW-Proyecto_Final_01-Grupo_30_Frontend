/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BancoPreguntasService } from './banco-preguntas.service';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Pregunta } from './pregunta';
import { Respuesta } from './respuesta';
import { BancoPreguntas } from './banco-preguntas';
import { Prueba } from './prueba';

describe('Service: BancoPreguntas', () => {
  let UrlBancoPreguntas: string = environment.baseUrlBancoPreguntas;
  let httpMock: HttpTestingController;
  let bancoPreguntasService: BancoPreguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, HttpClientTestingModule],
      providers: [BancoPreguntasService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should ...', inject([BancoPreguntasService], (service: BancoPreguntasService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle getCategorias successful HTTP request (status code 200)', () => {
    const categorias = [{ id: 1, nombre: 'sojash' }, { id: 2, nombre: 'sadas' }];

    bancoPreguntasService.getCategorias().subscribe(data => {
      expect(data).toEqual(categorias); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/categorias/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(categorias, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getCategorias failed HTTP request (status code 404)', () => {
    bancoPreguntasService.getCategorias().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/categorias/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getListaBancosPreguntas successful HTTP request (status code 200)', () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas = [{ id: 1, idEmpresa: 1, tipoBanco: '', categoria}];

    bancoPreguntasService.getListaBancosPreguntas(1).subscribe(data => {
      expect(data).toEqual(bancopreguntas); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/banco-preguntas/categoria/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(bancopreguntas, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getListaBancosPreguntas failed HTTP request (status code 404)', () => {
    bancoPreguntasService.getListaBancosPreguntas(1).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/banco-preguntas/categoria/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle createBancoPreguntas successful HTTP request (status code 200)', () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria};

    bancoPreguntasService.createBancoPreguntas(bancopreguntas).subscribe(data => {
      expect(data).toEqual(bancopreguntas); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/banco-preguntas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(bancopreguntas, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle createBancoPreguntas failed HTTP request (status code 404)', () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria};

    bancoPreguntasService.createBancoPreguntas(bancopreguntas).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/banco-preguntas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getBancoPreguntas successful HTTP request (status code 200)', () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria};

    bancoPreguntasService.getBancoPreguntas(1).subscribe(data => {
      expect(data).toEqual(bancopreguntas); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/banco-preguntas/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(bancopreguntas, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getBancoPreguntas failed HTTP request (status code 404)', () => {
    bancoPreguntasService.getBancoPreguntas(1).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/banco-preguntas/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle createPregunta successful HTTP request (status code 200)', () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria};
    const respuestas: Array<Respuesta> = [{ id: 1, respuesta: '', estado: '', puntos: 15, pregunta: null }]
    const pregunta: Pregunta = { id: 1, pregunta: 'pregunta1', bancoPreguntas: bancopreguntas, respuestas: respuestas };

    bancoPreguntasService.createPregunta(pregunta).subscribe(data => {
      expect(data).toEqual(pregunta); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/preguntas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(pregunta, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle createPregunta failed HTTP request (status code 404)', () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria};
    const respuestas: Array<Respuesta> = [{ id: 1, respuesta: '', estado: '', puntos: 15, pregunta: null }]
    const pregunta: Pregunta = { id: 1, pregunta: 'pregunta1', bancoPreguntas: bancopreguntas, respuestas: respuestas };

    bancoPreguntasService.createPregunta(pregunta).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/preguntas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should have bancoPreguntasCreated status true', () => {
    const spy = spyOn(bancoPreguntasService['projectCreatedSource'], 'next');

    bancoPreguntasService.bancoPreguntasCreated();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should handle getListaPreguntasBanco successful HTTP request (status code 200)', () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria};
    const respuestas: Array<Respuesta> = [{ id: 1, respuesta: '', estado: '', puntos: 15, pregunta: null }]
    const preguntas: Pregunta[] = [{ id: 1, pregunta: 'pregunta1', bancoPreguntas: bancopreguntas, respuestas: respuestas }];

    bancoPreguntasService.getListaPreguntasBanco(1).subscribe(data => {
      expect(data).toEqual(preguntas); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/preguntas/banco-preguntas/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(preguntas, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getListaPreguntasBanco failed HTTP request (status code 404)', () => {
    bancoPreguntasService.getListaPreguntasBanco(1).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/preguntas/banco-preguntas/1'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle createRespuesta successful HTTP request (status code 200)', () => {
    const respuesta: Respuesta = { id: 1, respuesta: '', estado: '', puntos: 15, pregunta: null };

    bancoPreguntasService.createRespuesta(respuesta).subscribe(data => {
      expect(data).toEqual(respuesta); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/respuestas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(respuesta, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle createRespuesta failed HTTP request (status code 404)', () => {
    const respuesta: Respuesta = { id: 1, respuesta: '', estado: '', puntos: 15, pregunta: null };

    bancoPreguntasService.createRespuesta(respuesta).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/respuestas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getListaPruebas successful HTTP request (status code 200)', () => {
    const pruebas: Prueba[] = [{ id: 1, nombre: 'sojash', descripcion: 'pruebas', bancosPreguntas: [] }];

    bancoPreguntasService.getListaPruebas().subscribe(data => {
      expect(data).toEqual(pruebas); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(pruebas, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getListaPruebas failed HTTP request (status code 404)', () => {
    bancoPreguntasService.getListaPruebas().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlBancoPreguntas + '/pruebas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });
});
