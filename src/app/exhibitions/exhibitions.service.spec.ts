/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExhibitionsService } from './exhibitions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Exhibitions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [ExhibitionsService]
    });
  });

  it('should ...', inject([ExhibitionsService], (service: ExhibitionsService) => {
    expect(service).toBeTruthy();
  }));
});
