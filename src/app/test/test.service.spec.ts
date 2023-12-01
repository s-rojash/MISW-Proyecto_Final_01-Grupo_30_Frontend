/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TestService } from './test.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: Test', () => {
  let service: TestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [TestService]
    });

    service = TestBed.inject(TestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([TestService], (service: TestService) => {
    expect(service).toBeTruthy();
  }));
});
