/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { ApplicantService } from './applicant.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Applicant } from './applicant';
import { Applicantskills } from './applicantskills';
import { CandidatoHabilidades } from '../principal/candidato-habilidades';
import { Signupapplicant } from '../signup/signupapplicant';

describe('Service: Applicant', () => {
  let UrlCandidatos: string = environment.baseUrl;
  let httpMock: HttpTestingController;
  let applicantService: ApplicantService;
  let pass2 = '12345';

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

  it('should handle getApplicant successful HTTP request (status code 200)', () => {
    const date = new Date('10/28/2023');
    const date2 = new Date('10/28/2023');

    const applicant: Applicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2,
          token: "sdasda", expireAt: date, createdAt: date2 };

    applicantService.getApplicant().subscribe(data => {
      expect(data).toEqual(applicant); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidatos/me'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(applicant, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getApplicant failed HTTP request (status code 404)', () => {
    applicantService.getApplicant().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidatos/me'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle updateApplicant successful HTTP request (status code 200)', () => {
    const date = new Date('10/28/2023');
    const date2 = new Date('10/28/2023');

    const applicant: Applicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2,
          token: "sdasda", expireAt: date, createdAt: date2 };

    applicantService.updateApplicant(applicant).subscribe(data => {
      expect(data).toEqual(applicant); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidatos/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(applicant, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle updateApplicant failed HTTP request (status code 404)', () => {
    const date = new Date('10/28/2023');
    const date2 = new Date('10/28/2023');

    const applicant: Applicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2,
          token: "sdasda", expireAt: date, createdAt: date2 };

    applicantService.updateApplicant(applicant).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidatos/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getSoftSkills successful HTTP request (status code 200)', () => {
    const applicantskills: Applicantskills[] = [{id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'}];

    applicantService.getSoftSkills().subscribe(data => {
      expect(data).toEqual(applicantskills); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/habilidades/tipo-habilidad/Blandas'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(applicantskills, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getSoftSkills failed HTTP request (status code 404)', () => {
    applicantService.getSoftSkills().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/habilidades/tipo-habilidad/Blandas'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getTechnicalSkills successful HTTP request (status code 200)', () => {
    const applicantskills: Applicantskills[] = [{id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'}];

    applicantService.getTechnicalSkills().subscribe(data => {
      expect(data).toEqual(applicantskills); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/habilidades/tipo-habilidad/Tecnicas'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(applicantskills, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getTechnicalSkills failed HTTP request (status code 404)', () => {
    applicantService.getTechnicalSkills().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/habilidades/tipo-habilidad/Tecnicas'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getProfessionalSkills successful HTTP request (status code 200)', () => {
    const applicantskills: Applicantskills[] = [{id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'}];

    applicantService.getProfessionalSkills().subscribe(data => {
      expect(data).toEqual(applicantskills); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/habilidades/tipo-habilidad/Profesionales'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(applicantskills, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getProfessionalSkills failed HTTP request (status code 404)', () => {
    applicantService.getProfessionalSkills().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/habilidades/tipo-habilidad/Profesionales'); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle createcandidatohabilidades successful HTTP request (status code 200)', () => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const candidatoHabilidades: CandidatoHabilidades = {id:1, candidato: signupapplicant, habilidad: applicantskill};

    applicantService.createcandidatohabilidades(candidatoHabilidades).subscribe(data => {
      expect(data).toEqual(candidatoHabilidades); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidato-habilidades/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush(candidatoHabilidades, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle createcandidatohabilidades failed HTTP request (status code 404)', () => {
    const signupapplicant: Signupapplicant = { id: 0, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const candidatoHabilidades: CandidatoHabilidades = {id:1, candidato: signupapplicant, habilidad: applicantskill};

    applicantService.createcandidatohabilidades(candidatoHabilidades).subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidato-habilidades/'); // Expect a single request to this URL
    expect(req.request.method).toBe('POST'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });

  it('should handle getcandidatohabilidadesByCandidato successful HTTP request (status code 200)', () => {
    const signupapplicant: Signupapplicant = { id: 1, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2 };
    const applicantskill: Applicantskills = {id: 1, tipoHabilidad: 'Tecnicas', habilidad: 'SQL', habilidad_en: 'SQL'};
    const candidatoHabilidades: CandidatoHabilidades[] = [{id:1, candidato: signupapplicant, habilidad: applicantskill}];

    applicantService.getcandidatohabilidadesByCandidato().subscribe(data => {
      expect(data).toEqual(candidatoHabilidades); // Assert that the response data matches the expected data
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidato-habilidades/candidatos/' + localStorage.getItem("API_CANDIDATO_ID")?.toString()); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush(candidatoHabilidades, { status: 200, statusText: 'OK' }); // Simulate a successful HTTP response with the mockResponse data and 200 status code
  });

  it('should handle getcandidatohabilidadesByCandidato failed HTTP request (status code 404)', () => {
    applicantService.getcandidatohabilidadesByCandidato().subscribe({
      next:() => fail('The request should have failed with 404 error'),
      error:(error) => {
        expect(error.status).toBe(404); // Assert that the error status is 404
      }
    });

    const req = httpMock.expectOne(UrlCandidatos + '/candidato-habilidades/candidatos/' + localStorage.getItem("API_CANDIDATO_ID")?.toString()); // Expect a single request to this URL
    expect(req.request.method).toBe('GET'); // Assert that the request method is GET

    req.flush('Not Found', { status: 404, statusText: 'Not Found' }); // Simulate a failed HTTP response with status code 404
  });
});
