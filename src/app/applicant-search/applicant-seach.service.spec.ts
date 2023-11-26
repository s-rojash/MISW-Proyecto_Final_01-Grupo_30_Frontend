/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ApplicantSearchService } from './applicant-search.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: ApplicantSeach', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [ApplicantSearchService]
    });
  });

  it('should ...', inject([ApplicantSearchService], (service: ApplicantSearchService) => {
    expect(service).toBeTruthy();
  }));
});
