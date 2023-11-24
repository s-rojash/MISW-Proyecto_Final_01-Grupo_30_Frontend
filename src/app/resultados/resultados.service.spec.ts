/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResultadosService } from './resultados.service';

describe('Service: Resultados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultadosService]
    });
  });

  it('should ...', inject([ResultadosService], (service: ResultadosService) => {
    expect(service).toBeTruthy();
  }));
});
