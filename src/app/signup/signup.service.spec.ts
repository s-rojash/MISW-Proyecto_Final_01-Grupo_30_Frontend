/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SignupService } from './signup.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('Service: Signup', () => {
  let httpMock: HttpTestingController;
  let signupService: SignupService;
  let pass = '12345';
  let Urlcandidatos: string = environment.baseUrl;
  let Urlempresas: string = environment.baseUrlCom;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [SignupService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    signupService = TestBed.inject(SignupService);
  });

  it('should ...', inject([SignupService], (service: SignupService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle createApplicant successful HTTP request (status code 200)', () => {
    const signupapplicant = { id: 1, nombres: 'Steve', apellidos : 'Rojas', tipoDocumento: 'C.C.', numDocumento: 1234,
          celular: '3183104480', email: 's.rojash@uniandes.edu.co', password: pass };

    signupService.createApplicant(signupapplicant).subscribe(data => {
      expect(data).toEqual(signupapplicant); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(Urlcandidatos + '/candidatos/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(signupapplicant, { status: 201, statusText: 'Created' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle createApplicant failed HTTP request (status code 404)', () => {
    const signupapplicant = { id: 1, nombres: 'Steve', apellidos : 'Rojas', tipoDocumento: 'C.C.', numDocumento: 1234,
          celular: '3183104480', email: 's.rojash@uniandes.edu.co', password: pass };

      signupService.createApplicant(signupapplicant).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(414); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(Urlcandidatos + '/candidatos/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 414, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle createCompany successful HTTP request (status code 200)', () => {
    const signupcompany = {id:0, razonSocial: 'Empresa de prueba', tipoDocumento: 'NIT', numDocumento: 1234, digitoVerificacion: 0,
          email: 's.rojash@uniandes.edu.co', password: pass };

      signupService.createCompany(signupcompany).subscribe(data => {
      expect(data).toEqual(signupcompany); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(Urlempresas + '/empresas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(signupcompany, { status: 201, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle createCompany failed HTTP request (status code 404)', () => {
    const signupcompany = { id:0,razonSocial: 'Empresa de prueba', tipoDocumento: 'NIT', numDocumento: 1234, digitoVerificacion: 0,
          email: 's.rojash@uniandes.edu.co', password: pass };

      signupService.createCompany(signupcompany).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(414); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(Urlempresas + '/empresas/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 414, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });
});
