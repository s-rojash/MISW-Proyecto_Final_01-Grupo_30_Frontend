import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrlApplicant: string = environment.baseUrl + '/candidatos/auth';
  private apiUrlCompany: string = environment.baseUrlCom + '/empresas/auth';

  constructor(private http: HttpClient) { }

  loginApplicant(login: Login): Observable<Login> {
    return this.http.post<Login>(this.apiUrlApplicant, login);
  }

  loginCompany(login: Login): Observable<Login> {
    return this.http.post<Login>(this.apiUrlCompany, login);
  }
}
