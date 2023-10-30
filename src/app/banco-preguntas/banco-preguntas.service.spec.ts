/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BancoPreguntasService } from './banco-preguntas.service';

describe('Service: BancoPreguntas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [BancoPreguntasService]
    });
  });

  it('should ...', inject([BancoPreguntasService], (service: BancoPreguntasService) => {
    expect(service).toBeTruthy();
  }));
});
