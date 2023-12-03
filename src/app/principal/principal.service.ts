import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CandidatoHabilidades } from './candidato-habilidades';
import { Pruebacandidato } from '../test/pruebacandidato';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient) { }

  private apiUrlSkills: string = environment.baseUrl + '/candidato-habilidades/candidatos/';
  private apiUrlPruebasCandidato: string = environment.baseUrlBancoPreguntas + '/pruebas-candidato/candidato/';

  getApplicantSkills(): Observable<CandidatoHabilidades[]> {
    const idcandidato = localStorage.getItem("API_CANDIDATO_ID")?.toString();
    return this.http.get<CandidatoHabilidades[]>(this.apiUrlSkills + idcandidato);
  }

  getPruebasCandidato(): Observable<Pruebacandidato[]>{
    const idcandidato = localStorage.getItem("API_CANDIDATO_ID")?.toString();
    return this.http.get<Pruebacandidato[]>(this.apiUrlPruebasCandidato + idcandidato);
  }
}
