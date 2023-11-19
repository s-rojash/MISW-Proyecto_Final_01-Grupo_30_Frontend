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

  // it('should create conjunto de pruebas', () => {
  //   const mockConjuntoPrueba: Conjuntoprueba = {
  //     id: null,
  //     bancoPreguntas: [],
  //     nombre: '',
  //     descripcion: ''
  //   };

  //   service.createConjuntoPruebas(mockConjuntoPrueba).subscribe(result => {
  //     expect(result).toEqual(mockConjuntoPrueba);
  //   });

  //   const request = httpMock.expectOne(`${apiUrl}/banco-preguntas/`);
  //   expect(request.request.method).toBe('POST');
  //   request.flush(mockConjuntoPrueba);
  // });


});
