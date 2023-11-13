import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from './categoria';
import { BancoPreguntas } from './banco-preguntas';
import { Pregunta } from './pregunta';
import { Respuesta } from './respuesta';
import { Prueba } from './prueba';

@Injectable({
  providedIn: 'root'
})

export class BancoPreguntasService {
  private apiUrl: string = environment.baseUrlBancoPreguntas;
  private bancoPreguntasCreatedSource = new BehaviorSubject<boolean>(false);
  bancoPreguntasCreated$ = this.bancoPreguntasCreatedSource.asObservable();

  private projectCreatedSource = new BehaviorSubject<boolean>(false);
  projectCreated$ = this.projectCreatedSource.asObservable();

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl + "/categorias/");
  }

  getListaBancosPreguntas(idCategoriaSeleccionada: number): Observable<BancoPreguntas[]> {
    return this.http.get<BancoPreguntas[]>(this.apiUrl + `/banco-preguntas/categoria/${idCategoriaSeleccionada}`);
  }
  createBancoPreguntas(bancoPreguntas: BancoPreguntas): Observable<BancoPreguntas> {
    bancoPreguntas.idEmpresa = Number(localStorage.getItem("API_EMPRESA_ID"));
    return this.http.post<BancoPreguntas>(this.apiUrl + `/banco-preguntas/`, bancoPreguntas);
  }

  getBancoPreguntas(id: number): Observable<BancoPreguntas> {
    return this.http.get<BancoPreguntas>(this.apiUrl + `/banco-preguntas/${id}`);
  }

  createPregunta(pregunta: Pregunta): Observable<Pregunta> {
    return this.http.post<Pregunta>(this.apiUrl + `/preguntas/`, pregunta);
  }

  bancoPreguntasCreated() {
    this.projectCreatedSource.next(true);
  }

  getListaPreguntasBanco(idBancoPreguntas: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.apiUrl + `/preguntas/banco-preguntas/${idBancoPreguntas}`);
  }

  createRespuesta(respuesta: Respuesta): Observable<Respuesta> {
    return this.http.post<Respuesta>(this.apiUrl + `/respuestas/`, respuesta);
  }

  getListaPruebas(): Observable<Prueba[]> {
    console.log(localStorage.getItem("API_TOKEN")?.toString());
    return this.http.get<Prueba[]>(this.apiUrl + `/pruebas/`);
  }

  getPrueba(idPrueba: number): Observable<Prueba> {
    return this.http.get<Prueba>(this.apiUrl + `/pruebas/${idPrueba}`);
  }


}
