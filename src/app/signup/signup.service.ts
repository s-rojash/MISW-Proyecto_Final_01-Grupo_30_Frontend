import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Signupapplicant } from './signupapplicant';
import { Signupcompany } from './signupcompany';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrlApplicant: string = environment.baseUrl + '/candidatos/';
  private apiUrlCompany: string = environment.baseUrl + '/empresas/';

  constructor(private http: HttpClient) { }

  createApplicant(signupapplicant: Signupapplicant): Observable<Signupapplicant> {
    return this.http.post<Signupapplicant>(this.apiUrlApplicant, signupapplicant);
  }

  createCompany(signupcompany: Signupcompany): Observable<Signupcompany> {
    return this.http.post<Signupcompany>(this.apiUrlCompany, signupcompany);
  }
}
