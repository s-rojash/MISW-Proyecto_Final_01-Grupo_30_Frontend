import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {  Observable } from 'rxjs';
import { Conjuntoprueba } from './conjuntoprueba';


@Injectable({
  providedIn: 'root'
})


export class ConjuntoPruebasService {
  private apiUrl: string = environment.baseUrlBancoPreguntas;

constructor(private http: HttpClient) { }

createConjuntoPruebas(conjuntoprueba: Conjuntoprueba): Observable<Conjuntoprueba> {
  return this.http.post<Conjuntoprueba>(this.apiUrl + `/banco-preguntas/`, conjuntoprueba);
}


}
