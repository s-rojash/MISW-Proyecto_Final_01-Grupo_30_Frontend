import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConjuntoPruebasService } from './conjunto-pruebas.service';
import { Conjuntoprueba } from './conjuntoprueba';
import { environment } from 'src/environments/environment';
import { BancoPreguntas } from '../banco-preguntas/banco-preguntas';

describe('ConjuntoPruebasService', () => {
  let injector: TestBed;
  let service: ConjuntoPruebasService;
  let httpMock: HttpTestingController;
  let UrlBancoPreguntas: string = environment.baseUrlBancoPreguntas;
  let conjuntoPruebasService: ConjuntoPruebasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConjuntoPruebasService]
    });

    injector = getTestBed();
    service = injector.get(ConjuntoPruebasService);
    conjuntoPruebasService = TestBed.inject(ConjuntoPruebasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return all bancoPreguntas', () => {
    const bancoPreguntasList: BancoPreguntas[] = [];
   
    service.getAllBancoPreguntas().subscribe(
       data => expect(data).toEqual(bancoPreguntasList, 'should return bancoPreguntas list'),
       fail
    );
   
    const req = httpMock.expectOne(UrlBancoPreguntas + '/banco-preguntas/');
    expect(req.request.method).toEqual('GET');
    req.flush(bancoPreguntasList);
   });
   

   it('should create a conjuntoPruebas', () => {
    const id = 1;
    const bancoPreguntas: { id: number }[] = [];
    const nombre = 'conjunto de pruebas';
    const descripcion = 'descripcion de la conjunto de pruebas';
    const conjuntoprueba = new Conjuntoprueba(id, bancoPreguntas, nombre, descripcion);
   
    service.createConjuntoPruebas(conjuntoprueba).subscribe(
       data => expect(data).toEqual(conjuntoprueba, 'should return created conjuntoprueba'),
       fail
    );
   
    const req = httpMock.expectOne(UrlBancoPreguntas + `/pruebas/`);
    expect(req.request.method).toEqual('POST');
    req.flush(conjuntoprueba);
   });
   



});
