import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Museum } from './museum';
import { MuseumDetail } from './museum-detail';
//import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  private apiUrl: string = environment.baseUrl + '/museums';
  constructor(private http: HttpClient) { }
  
  //getMuseums():Observable<Museum[]>{
    //  return this.http.get<Museum[]>(this.apiUrl);
    getMuseums():Observable<MuseumDetail[]>{
        return this.http.get<MuseumDetail[]>(this.apiUrl);
        //return this.http.get<MuseumDetail[]>(this.apiUrl).pipe(
        //catchError(err=> throwError(() => new Error('Error del servicio')))
        //)
  }
  getMuseum(id: string):Observable<MuseumDetail[]>{
        return this.http.get<MuseumDetail[]>(this.apiUrl + "/" + id);
  }
  createMuseum(museum: Museum): Observable<Museum> {
   return this.http.post<Museum>(this.apiUrl, museum);
    }
   
}
