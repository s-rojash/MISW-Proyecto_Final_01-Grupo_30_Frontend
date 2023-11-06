/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicantSeachService } from './applicant-seach.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: ApplicantSeach', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [ApplicantSeachService]
    });
  });

  it('should ...', inject([ApplicantSeachService], (service: ApplicantSeachService) => {
    expect(service).toBeTruthy();
  }));
});
