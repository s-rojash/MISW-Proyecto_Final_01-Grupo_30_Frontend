import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from './project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl: string = environment.baseUrlProyectos + '/proyectos/';
  private projectCreatedSource = new BehaviorSubject<boolean>(false);
  projectCreated$ = this.projectCreatedSource.asObservable();
 
  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<Project> {
    project.idEmpresa =1;
    return this.http.post<Project>(this.apiUrl, project);
     }
    

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
    }
  
  projectCreated() {
      this.projectCreatedSource.next(true);
    }

}
