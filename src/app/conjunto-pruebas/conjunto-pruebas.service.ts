import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable, catchError, tap } from 'rxjs';
import { Conjuntoprueba } from './conjuntoprueba';
import { BancoPreguntas } from '../banco-preguntas/banco-preguntas';


@Injectable({
  providedIn: 'root'
})


export class ConjuntoPruebasService {
  private apiUrl: string = environment.baseUrlBancoPreguntas;

constructor(private http: HttpClient) { }

private getHttpOptions() {
  const token = localStorage.getItem('API_TOKEN');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return { headers };
}


createConjuntoPruebas(conjuntoprueba: Conjuntoprueba): Observable<Conjuntoprueba> {
  const httpOptions = this.getHttpOptions();
  console.log('Objeto enviado:', conjuntoprueba);

  return this.http.post<Conjuntoprueba>(this.apiUrl + `/pruebas/`, conjuntoprueba, httpOptions)
  .pipe(
    tap(response => {
      console.log('Respuesta recibida:' , response);

    }),
    catchError(error => {

      console.error('Error en la petición:', error);
      throw error;
    })
  );
}

getAllBancoPreguntas(): Observable<BancoPreguntas[]> {
  const httpOptions = this.getHttpOptions();
  return this.http.get<BancoPreguntas[]>(this.apiUrl + `/banco-preguntas/`, httpOptions)
}


getAllConjuntoPruebas(): Observable<Conjuntoprueba[]> {
  const httpOptions = this.getHttpOptions();
  console.log("httpOptions",httpOptions) 
  console.log("apiUrl",this.apiUrl) 
  return this.http.get<Conjuntoprueba[]>(this.apiUrl + `/pruebas/`, httpOptions)
  .pipe(
    tap(response => {
      console.log('Respuesta recibida:' , response);

    }),
    catchError(error => {

      console.error('Error en la petición:', error);
      throw error;
    })
  );
}


}
