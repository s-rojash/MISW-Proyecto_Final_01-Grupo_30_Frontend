import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa el módulo de prueba para HttpClient
import { ResultadosService } from './resultados.service';

describe('Service: Resultados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Agrega HttpClientTestingModule a los imports
      providers: [ResultadosService]
    });
  });

  it('should ...', inject([ResultadosService], (service: ResultadosService) => {
    expect(service).toBeTruthy();
  }));
});
