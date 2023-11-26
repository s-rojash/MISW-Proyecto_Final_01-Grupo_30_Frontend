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





getResults(): Observable<Resultados[]> {
  const httpOptions = this.getHttpOptions();

  const mockResponse = [
    {
      "id": 1,
      "idPrueba": 1,
      "idCandidato": 1,
      "puntaje": 80,
      "estado": "Presentado",
      "fechaPresentacion": "2023-11-23"
    }
  ];
   // Devolver un observable que emita la respuesta mock
   return of(mockResponse);
}



}
