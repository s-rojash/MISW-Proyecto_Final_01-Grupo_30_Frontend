import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Artworks } from './artworks';
import { ArtworkDetail } from './artwork-detail';
import { MuseumDetail } from '../museum/museum-detail';
import { ArtworkComplete } from './artwork-complete';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {

  private apiUrl: string = environment.baseUrl + '/artworks';
  private apiUrl2: string = environment.baseUrl + '/artists/';
  private apiUrl3: string = environment.baseUrl + '/exhibitions/';
  private apiUrl4: string = environment.baseUrl + '/museums/';

  constructor( private http: HttpClient ) { }

  createArtwork(artworks: Artworks, artistId: string): Observable<Artworks> {
    console.log(artworks);
    return this.http.post<Artworks>(this.apiUrl2 + artistId +'/artworks', artworks).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getArtworks(): Observable<ArtworkDetail[]> {
    return this.http.get<ArtworkDetail[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getArtworksComplete(): Observable<ArtworkComplete[]> {
    return this.http.get<ArtworkComplete[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getArtistArtworks(id: string): Observable<ArtworkDetail[]> {
    return this.http.get<ArtworkDetail[]>(this.apiUrl2 + id + '/artworks').pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getExhibitionsArtworks(idExhibition: string): Observable<ArtworkDetail[]> {
    return this.http.get<ArtworkDetail[]>(this.apiUrl3 + idExhibition + '/artworks').pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getMuseums(): Observable<MuseumDetail[]> {
    return this.http.get<MuseumDetail[]>(this.apiUrl4).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  addArtworkExhibition(idArtworkSelected: string, idExhibition: string): Observable<Artworks> {
    return this.http.post<Artworks>(this.apiUrl3 + idExhibition +'/artworks/'+ idArtworkSelected, Artworks).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  addImageArtwork(idArtist: string, idArtwork: number, urlNewImage: string) {
    return this.http.put<any>(this.apiUrl2 + idArtist +'/artworks/'+ idArtwork, {"mainImage":urlNewImage}).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }
}