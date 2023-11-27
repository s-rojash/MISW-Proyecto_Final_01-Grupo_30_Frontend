/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { PrincipalService } from './principal.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

describe('Service: Principal', () => {
  let httpMock: HttpTestingController;
  let principalService: PrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [PrincipalService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    principalService = TestBed.inject(PrincipalService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should ...', inject([PrincipalService], (service: PrincipalService) => {
    expect(service).toBeTruthy();
  }));
});
