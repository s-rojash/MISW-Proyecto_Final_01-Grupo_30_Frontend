/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { ApplicantService } from './applicant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('Service: Applicant', () => {
  let httpMock: HttpTestingController;
  let applicantService: ApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [],
      providers: [ApplicantService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    applicantService = TestBed.inject(ApplicantService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should ...', inject([ApplicantService], (service: ApplicantService) => {
    expect(service).toBeTruthy();
  }));
});
