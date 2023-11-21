import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompanyService } from './company.service';
import { Signupcompany } from '../signup/signupcompany';
import { environment } from 'src/environments/environment';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpTestingController: HttpTestingController;




  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });

    service = TestBed.inject(CompanyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


   
   it('should send a POST request to create the company', () => {
    const signupcompany = new Signupcompany(
       'Razon Social',
       'Tipo Documento',
       123456789,
       1,
       'email@example.com',
       2,
       'password'
    );
   
    let apiUrlCompany: string = environment.baseUrlCom + '/empresas/';
   
    service.createCompany(signupcompany).subscribe();
   
    const req = httpTestingController.expectOne(`${apiUrlCompany}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(signupcompany);
   
    req.flush(signupcompany);
   });


  it('should send a POST request to edit the company', () => {
 
    const signupcompany = new Signupcompany(
      'Razon Social',
      'Tipo Documento',
      123456789,
      1,
      'email@example.com',
      0,
      'password'
    );

    let  apiUrlCompany: string = environment.baseUrlCom + '/empresas/';

    service.editCompany(signupcompany).subscribe();

    const req = httpTestingController.expectOne(`${apiUrlCompany}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(signupcompany);

   
    req.flush(signupcompany);
  });

    it('should send a GET request to get the company', () => {
    const idEmpresa = 0;
    let apiUrlCompany: string = environment.baseUrlCom + '/empresas/';
   
    service.getCompany().subscribe();
   
    const req = httpTestingController.expectOne(`${apiUrlCompany}${idEmpresa}`);
    expect(req.request.method).toBe('GET');
   
    req.flush({ data: 'test' });
   });
});
