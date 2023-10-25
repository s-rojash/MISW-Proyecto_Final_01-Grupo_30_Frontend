import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl: string = environment.baseUrlProyectos + '/equipos/';


  constructor(private http: HttpClient) { }
  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
    }

}
