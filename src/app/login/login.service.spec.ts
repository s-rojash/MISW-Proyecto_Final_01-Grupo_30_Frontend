/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

describe('Service: Login', () => {
  let httpMock: HttpTestingController;
  let loginService: LoginService;
  let pass = '12345';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations:[],
      providers: [LoginService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests after each test
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle loginApplicant successful HTTP request (status code 200)', () => {
    const login = { id: 1, email: 's.rojash@uniandes.edu.co', password: pass, token: "" };

    loginService.loginApplicant(login).subscribe(data => {
      expect(data).toEqual(login); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne('https://ms-candidatos.azurewebsites.net/candidatos/auth'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(login, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle loginApplicant failed HTTP request (status code 404)', () => {
    const login = { id: 1, email: 's.rojash@uniandes.edu.co', password: pass, token: "" };

    loginService.loginApplicant(login).subscribe(
      data => fail('The request should have failed with 404 error'),
      error => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    );

    const req = httpMock.expectOne('https://ms-candidatos.azurewebsites.net/candidatos/auth'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle loginCompany successful HTTP request (status code 200)', () => {
    const company = { id: 1, email: 's.rojash@uniandes.edu.co', password: pass, token: "" };

    loginService.loginCompany(company).subscribe(data => {
      expect(data).toEqual(company); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne('https://ms-empresas.azurewebsites.net/empresas/auth'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(company, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle loginCompany failed HTTP request (status code 404)', () => {
    const company = { id: 1, email: 's.rojash@uniandes.edu.co', password: pass, token: "" };

    loginService.loginCompany(company).subscribe(
      data => fail('The request should have failed with 404 error'),
      error => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    );

    const req = httpMock.expectOne('https://ms-empresas.azurewebsites.net/empresas/auth'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });
});
