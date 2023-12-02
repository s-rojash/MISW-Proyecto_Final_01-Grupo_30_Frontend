import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pruebacandidato } from './pruebacandidato';
import { Observable } from 'rxjs';
import { Pregunta } from './pregunta';
import { PresentarPrueba } from './presentar-prueba';
import { PruebacandidatoEnd } from './pruebacandidatoEnd';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrlPreguntasBancoPreguntas: string = environment.baseUrlBancoPreguntas + '/preguntas/candidato-banco-preguntas/';
  private apiUrlPruebasCandidato: string = environment.baseUrlBancoPreguntas + '/pruebas-candidato/';
  private apiUrlPresentarPrueba: string = environment.baseUrlPresentarPrueba + '/presentar-prueba/';

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const token = "";
    const headers = new HttpHeaders({
    });
    return { headers };
  }

  getPruebacandidatoById(pruebacandidatoId: number): Observable<Pruebacandidato> {
    return this.http.get<Pruebacandidato>(this.apiUrlPruebasCandidato + pruebacandidatoId);
  }

  getPreguntas(bancopreguntaId: number|null): Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.apiUrlPreguntasBancoPreguntas + bancopreguntaId);
  }

  saveRespuesta(presentarPrueba: PresentarPrueba): Observable<PresentarPrueba>{
    return this.http.post<PresentarPrueba>(this.apiUrlPresentarPrueba, presentarPrueba );
  }

  getSavedRespuestas(idPrueba:number): Observable<PresentarPrueba[]>{
    return this.http.get<PresentarPrueba[]>(this.apiUrlPresentarPrueba + "prueba/" + idPrueba);
  }

  saveEndTest(pruebacandidatoEnd:PruebacandidatoEnd){
    const httpOptions = this.getHttpOptions();
    this.http.post<PruebacandidatoEnd>(this.apiUrlPresentarPrueba + "finalizar", pruebacandidatoEnd, httpOptions );
  }
}
