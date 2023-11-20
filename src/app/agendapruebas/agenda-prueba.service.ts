import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AgendaPrueba } from './agenda-prueba';
import { Candidato } from './candidato';
import { ResultadoPrueba } from './resultado-prueba';

@Injectable({
  providedIn: 'root'
})

export class AgendaPruebaService {
  private apiUrl: string = environment.baseUrlEntrevistas;
  private apiUrlCandidatos: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getListaAgendaPrueba(): Observable<AgendaPrueba[]> {
    return this.http.get<AgendaPrueba[]>(this.apiUrl + "/agendar-pruebas/");
  }

  getAgendaPrueba(idAgendaPrueba: number): Observable<AgendaPrueba> {
    return this.http.get<AgendaPrueba>(this.apiUrl + "/agendar-pruebas/" + idAgendaPrueba);
  }

  saveListaAgendaPrueba(agendaPrueba: AgendaPrueba): Observable<AgendaPrueba> {

    return this.http.post<AgendaPrueba>(this.apiUrl + `/agendar-pruebas/`, agendaPrueba);
  }

  getListaCandidatos(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(this.apiUrlCandidatos + "/candidatos/");
  }


  getCandidato(idCandidato: number): Observable<Candidato> {
    return this.http.get<Candidato>(this.apiUrlCandidatos + "/candidatos/" + idCandidato);
  }

  saveResultadoPrueba(resultadoPrueba: ResultadoPrueba){
    return this.http.post<ResultadoPrueba>(this.apiUrl + `/resultados-pruebas/`, resultadoPrueba);
  }
}
