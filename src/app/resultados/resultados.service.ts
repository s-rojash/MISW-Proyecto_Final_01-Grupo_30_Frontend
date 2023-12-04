import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, catchError, of, tap } from 'rxjs';
import { Resultados } from './resultados';
import { Signupapplicant } from '../signup/signupapplicant';


@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  private apiUrl: string = environment.baseUrlBancoPreguntas;


constructor(private http: HttpClient) { }


private getHttpOptions() {
  const token = localStorage.getItem('API_TOKEN');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return { headers };
}

getAllResults(): Observable<Resultados[]> {

  const url = `${this.apiUrl}/pruebas-candidato/`;
  console.log("url",url)
  const httpOptions = this.getHttpOptions();
  return this.http.get<Resultados[]>(url, httpOptions);
}

}
