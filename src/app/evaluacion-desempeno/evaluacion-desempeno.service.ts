import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Candidato } from './candidato';
import { ResultadoEvaluacionDesempeno } from './resultado-evaluacion-desempeno';

@Injectable({
  providedIn: 'root'
})

export class EvaluacionDesempenoService {
  private apiUrl: string = environment.baseUrlEntrevistas;
  private apiUrlCandidatos: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCandidato(idCandidato: number): Observable<Candidato> {
    return this.http.get<Candidato>(this.apiUrlCandidatos + "/candidatos/" + idCandidato);
  }

  saveResultadoEvaluacionDesempeno(resultadoEvaluacionDesempeno: ResultadoEvaluacionDesempeno){
    return this.http.post<ResultadoEvaluacionDesempeno>(this.apiUrl + `/resultados-evaluacion-desepeno/`, resultadoEvaluacionDesempeno);
  }
}
