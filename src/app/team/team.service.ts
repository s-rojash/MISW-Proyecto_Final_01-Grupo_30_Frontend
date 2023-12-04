import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from './team';
import { TeamAssign } from './team-assign';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl: string = environment.baseUrlProyectos + '/equipos/';
  private apiUrlAssign: string = environment.baseUrlProyectos + '/asignar-equipo/';


  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('API_TOKEN');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers };
 }


  createTeam(team: Team): Observable<Team> {
    const httpOptions = this.getHttpOptions();

    return this.http.post<Team>(this.apiUrl, team,httpOptions );
    }

    getTeams(): Observable<Team[]> {
      return this.http.get<Team[]>(this.apiUrl);
    }

    deleteTeam(teamId: string): Observable<void> {
      const url = `${this.apiUrl}/${teamId}`;
      return this.http.delete<void>(url);
    }

    updateTeam(team: Team): Observable<Team> {
      const url = `${this.apiUrl}/${team.id}`;
      const httpOptions = this.getHttpOptions();
      return this.http.put<Team>(url, team, httpOptions);
    }

    getTeamsByProject(projectId: number): Observable<Team[]> {
      const url = `${this.apiUrl}proyecto/${projectId}`;
      const httpOptions = this.getHttpOptions();
      return this.http.get<Team[]>(url,httpOptions);
    }

    getTeamsById(TeamId: number): Observable<Team> {
      const url = `${this.apiUrl}${TeamId}`;
      const httpOptions = this.getHttpOptions();
      return this.http.get<Team>(url,httpOptions);
    }

    createAssignTeam(teamAssign: TeamAssign): Observable<TeamAssign>{
      return this.http.post<TeamAssign>(this.apiUrlAssign, teamAssign);
    }

    getAllAssignTeam(): Observable<TeamAssign[]> {
      return this.http.get<TeamAssign[]>(this.apiUrlAssign);
    }

    deleteAssignTeam(id:number):Observable<any>{
      return this.http.delete(this.apiUrlAssign + id);
    }
}
