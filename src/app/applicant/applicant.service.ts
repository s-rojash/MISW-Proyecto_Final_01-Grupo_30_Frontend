import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Applicant } from './applicant';
import { Applicantskills } from './applicantskills';
import { CandidatoHabilidades } from '../principal/candidato-habilidades';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  private apiUrlApplicant: string = environment.baseUrl + '/candidatos/';
  private apiUrlApplicantSkills: string = environment.baseUrl + '/habilidades/tipo-habilidad/';
  private apiUrlApplicantSkills2: string = environment.baseUrl + '/candidato-habilidades/';

  getApplicant(): Observable<Applicant> {
    return this.http.get<Applicant>(this.apiUrlApplicant + "me");
  }

  updateApplicant(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(this.apiUrlApplicant, applicant);
  }

  getSoftSkills(): Observable<Applicantskills[]> {
    return this.http.get<Applicantskills[]>(this.apiUrlApplicantSkills + "Blandas");
  }

  getTechnicalSkills(){
    return this.http.get<Applicantskills[]>(this.apiUrlApplicantSkills + "Tecnicas");
  }

  getProfessionalSkills(){
    return this.http.get<Applicantskills[]>(this.apiUrlApplicantSkills + "Profesionales");
  }

  createcandidatohabilidades(candidatoHabilidades: CandidatoHabilidades): Observable<CandidatoHabilidades>{
    return this.http.post<CandidatoHabilidades>(this.apiUrlApplicantSkills2, candidatoHabilidades);
  }

  getcandidatohabilidadesByCandidato(){
    return this.http.get<CandidatoHabilidades[]>(this.apiUrlApplicantSkills2 + "candidatos/" + localStorage.getItem("API_CANDIDATO_ID")?.toString());
  }
}
