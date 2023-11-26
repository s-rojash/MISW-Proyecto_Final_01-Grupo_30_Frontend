import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Signupapplicant } from '../signup/signupapplicant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Applicant } from './applicant';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  private apiUrlApplicant: string = environment.baseUrl + '/candidatos/';

  getApplicant(): Observable<Applicant> {
    return this.http.get<Applicant>(this.apiUrlApplicant + "me");
  }

  updateApplicant(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(this.apiUrlApplicant, applicant);
  }
}
