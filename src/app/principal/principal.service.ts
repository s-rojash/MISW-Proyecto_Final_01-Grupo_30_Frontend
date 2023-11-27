import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CandidatoHabilidades } from './candidato-habilidades';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient) { }

  private apiUrlSkills: string = environment.baseUrl + '/candidato-habilidades/candidatos/';

  getApplicantSkills(): Observable<CandidatoHabilidades[]> {
    const idcandidato = localStorage.getItem("API_CANDIDATO_ID")?.toString();
    return this.http.get<CandidatoHabilidades[]>(this.apiUrlSkills + idcandidato);
  }
}
