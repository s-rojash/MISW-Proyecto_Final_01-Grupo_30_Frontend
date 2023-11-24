import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, catchError, tap } from 'rxjs';


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




}
