import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PruebaAgendada } from './prueba-agendada';

@Injectable({
  providedIn: 'root'
})
export class PruebasAgendadasService {

  private apiUrlEntrevistas: string = environment.baseUrlEntrevistas;

  constructor(private http: HttpClient) { }

  listarPruebasAsignadas(idCandidato: number): Observable<Array<PruebaAgendada>> {
    return this.http.get<Array<PruebaAgendada>>(this.apiUrlEntrevistas + "/agenda-pruebas/ListarAgendaPruebaCandidado/" + idCandidato);
  }
}
