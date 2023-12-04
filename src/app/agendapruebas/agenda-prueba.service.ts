import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AgendaPrueba } from './agenda-prueba';
import { Candidato } from './candidato';
import { ResultadoPrueba } from './resultado-prueba';
import { Signupapplicant } from '../signup/signupapplicant';

@Injectable({
  providedIn: 'root'
})

export class AgendaPruebaService {
  private apiUrl: string = environment.baseUrlBancoPreguntas;
  private apiUrlCandidatos: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getListaAgendaPrueba(): Observable<AgendaPrueba[]> {
    return this.http.get<AgendaPrueba[]>(this.apiUrl + "/pruebas-candidato/");
  }

  getAgendaPrueba(idAgendaPrueba: number): Observable<AgendaPrueba> {
    return this.http.get<AgendaPrueba>(this.apiUrl + "/pruebas-candidato/" + idAgendaPrueba);
  }

  saveListaAgendaPrueba(agendaPrueba: AgendaPrueba): Observable<AgendaPrueba> {

    return this.http.post<AgendaPrueba>(this.apiUrl + `/pruebas-candidato/`, agendaPrueba);
  }

  getListaCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(this.apiUrlCandidatos + "/candidatos/");
  }

  getCandidato(idCandidato: number): Observable<Signupapplicant> {
    return this.http.get<Signupapplicant>(this.apiUrlCandidatos + "/candidatos/" + idCandidato);
  }

  saveResultadoPrueba(resultadoPrueba: ResultadoPrueba){
    return this.http.post<ResultadoPrueba>(this.apiUrl + `/resultados-pruebas/`, resultadoPrueba);
  }
}
