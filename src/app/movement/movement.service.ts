import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movement } from './movement';
//import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

private apiUrl: string = environment.baseUrl + '/movements';

  constructor(private http: HttpClient) { }
  
  createMovement(movement: Movement): Observable<Movement> {
   return this.http.post<Movement>(this.apiUrl, movement);
    }
}
