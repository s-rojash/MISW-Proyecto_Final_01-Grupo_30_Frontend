/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AgendaPruebaService } from '../agendapruebas/agenda-prueba.service';
import { Candidato } from './candidato';

describe('Service: EvaluacionDesempeno', () => {
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
});
