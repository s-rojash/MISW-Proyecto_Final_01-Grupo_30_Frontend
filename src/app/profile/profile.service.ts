import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Profile } from './profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl: string = environment.baseUrlProyectos + '/perfiles/';


constructor(private http: HttpClient) { }

  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
    }

   getProfile(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
    }


}
