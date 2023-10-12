import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Exhibitions } from './exhibitions';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {

  private apiUrl: string = environment.baseUrl + "/museums";

  constructor(private http : HttpClient) { }

  createExhibition(exhibition: Exhibitions): Observable<Exhibitions> {
    console.log(exhibition);
    return this.http.post<Exhibitions>(this.apiUrl + '/'+ environment.idMuseum +'/exhibitions', exhibition).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getExhibitions(id: string): Observable<Exhibitions[]> {
    environment.idMuseum = id;
    return this.http.get<Exhibitions[]>(this.apiUrl + '/'+ id +'/exhibitions').pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getExhibition(id: string): Observable<Exhibitions> {
    return this.http.get<Exhibitions>(this.apiUrl + '/'+ environment.idMuseum +'/exhibitions' + "/" + id).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }
}
