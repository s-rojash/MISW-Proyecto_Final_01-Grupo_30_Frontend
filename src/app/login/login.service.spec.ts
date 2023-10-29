/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Login } from './login';

describe('Service: Login', () => {
  let loginService: LoginService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations:[],
      providers: [LoginService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('#getData should return expected data', inject([LoginService], (service: LoginService) => {
    const login: Login = {
       email: 's.rojash@uniandes.edu.',
       password: '12345'
    };

    // Make an HTTP request with the provided object as a parameter
    service.loginApplicant(login).subscribe(response => {
      // Expect the response to be truthy (not null or undefined)
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://ms-candidatos.azurewebsites.net/candidatos/auth');
    expect(req.request.method).toBe('POST'); // Assuming it's a POST request

    // Check if the post method of the http client was called with the correct arguments
    req.flush({}, { status: 200, statusText: 'OK' });
  }));
});
