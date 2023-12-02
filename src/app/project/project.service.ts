import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Project } from './project';

@Injectable({
 providedIn: 'root'
})
export class ProjectService {
 private apiUrl: string = environment.baseUrlProyectos + '/proyectos/';
 private projectCreatedSource = new BehaviorSubject<boolean>(false);
 projectCreated$ = this.projectCreatedSource.asObservable();

 constructor(private http: HttpClient) { }

 private getHttpOptions() {
    const token = localStorage.getItem("API_TOKEN");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers };
 }

 createProject(project: Project): Observable<Project> {
    const httpOptions = this.getHttpOptions();

    project.idEmpresa = Number(localStorage.getItem('API_EMPRESA_ID'));
    const { idEmpresa, ...projectWithoutIdEmpresa } = project;

    return this.http.post<Project>(this.apiUrl, projectWithoutIdEmpresa, httpOptions);
 }

getProjects(): Observable<Project[]> {
    const httpOptions = this.getHttpOptions();

    console.log('Making GET request to:', this.apiUrl);

    return this.http.get<Project[]>(this.apiUrl, httpOptions)
      .pipe(
        tap(response => {
          console.log('Response Data:', response);
                })
      );
}


 projectCreated() {
      this.projectCreatedSource.next(true);
 }

 updateProject(project: Project): Observable<Project> {

    const httpOptions = this.getHttpOptions();
    return this.http.post<Project>(this.apiUrl, project, httpOptions);

 }
}
