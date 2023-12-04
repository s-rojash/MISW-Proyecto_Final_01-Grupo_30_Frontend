import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signupcompany } from '../signup/signupcompany';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrlCompany: string = environment.baseUrlCom + '/empresas/';

  constructor(private http: HttpClient) {}

  editCompany(signupcompany: Signupcompany): Observable<Signupcompany> {
    return this.http.post<Signupcompany>(this.apiUrlCompany, signupcompany);
  }
  
  getCompany(): Observable<Signupcompany> {
    const idEmpresa = Number(localStorage.getItem('API_EMPRESA_ID'));
    return this.http.get<Signupcompany>(this.apiUrlCompany + idEmpresa);
  }

  createCompany(signupcompany: Signupcompany): Observable<Signupcompany> {
    signupcompany.id = Number(localStorage.getItem('API_EMPRESA_ID'));
    console.log("elobjeto a crear",signupcompany)
    return this.http.post<Signupcompany>(this.apiUrlCompany, signupcompany);
  }

  
}
