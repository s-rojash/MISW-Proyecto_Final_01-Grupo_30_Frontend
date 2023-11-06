/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { EvaluationService } from './evaluation.service';
import { HttpClientTestingModule  } from '@angular/common/http/testing';

describe('Service: Evaluation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [EvaluationService]
    });
  });

  it('should ...', inject([EvaluationService], (service: EvaluationService) => {
    expect(service).toBeTruthy();
  }));
});
