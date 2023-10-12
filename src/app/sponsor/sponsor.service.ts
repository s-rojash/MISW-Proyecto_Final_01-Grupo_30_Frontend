import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Sponsor } from './sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private apiUrl: string = environment.baseUrl + '/sponsors';

  constructor(private http : HttpClient) { }

  createSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(this.apiUrl, sponsor).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getSponsor(id: string): Observable<Sponsor> {
    return this.http.get<Sponsor>(this.apiUrl + "/" + id).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

}
