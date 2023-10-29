import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from './categoria';
import { BancoPreguntas } from './banco-preguntas';
import { Pregunta } from './pregunta';
import { Respuesta } from './respuesta';

@Injectable({
  providedIn: 'root'
})

export class BancoPreguntasService {
  private apiUrl: string = environment.baseUrlProyectos;
  private bancoPreguntasCreatedSource = new BehaviorSubject<boolean>(false);
  bancoPreguntasCreated$ = this.bancoPreguntasCreatedSource.asObservable();

  private projectCreatedSource = new BehaviorSubject<boolean>(false);
  projectCreated$ = this.projectCreatedSource.asObservable();

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + "/categorias/");
  }

  getListaBancosPreguntas(idCategoriaSeleccionada: number): Observable<BancoPreguntas[]> {
    return this.http.get<BancoPreguntas[]>(this.apiUrl + `/banco-preguntas/empresa/1/categoria/${idCategoriaSeleccionada}`);
  }
  createBancoPreguntas(bancoPreguntas: BancoPreguntas): Observable<BancoPreguntas> {
    bancoPreguntas.idEmpresa =1;
    return this.http.post<BancoPreguntas>(this.apiUrl + `/banco-preguntas/`, bancoPreguntas);
  }

  getBancoPreguntas(id: number): Observable<BancoPreguntas> {
    return this.http.get<BancoPreguntas>(this.apiUrl + `/banco-preguntas/${id}/empresa/1`);
  }


  bancoPreguntasCreated() {
    this.projectCreatedSource.next(true);
  }
}
