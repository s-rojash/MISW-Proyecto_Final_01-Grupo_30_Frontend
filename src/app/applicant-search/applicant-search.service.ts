import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habilidades } from './habilidades';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidadescandidato } from './habilidadesCandidato';


@Injectable({
  providedIn: 'root'
 })

 
export class ApplicantSearchService {
    public apiUrl: string = environment.baseUrl;

    
constructor(private http: HttpClient) { }

private getHttpOptions() {
    const token = localStorage.getItem('API_TOKEN');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  
getHabilidadesBlandas(): Observable<Habilidades[]> {
    const httpOptions = this.getHttpOptions();
    const url = (this.apiUrl + `/habilidades/tipo-habilidad/Blandas`)
    console.log(url)
    return this.http.get<Habilidades[]>(this.apiUrl + `/habilidades/tipo-habilidad/Blandas`, httpOptions)
 
 
  }

  getHabilidadesTecnicas(): Observable<Habilidades[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Habilidades[]>(this.apiUrl + `/habilidades/tipo-habilidad/Tecnicas`, httpOptions)
  }

  
  getHabilidadesProfesionales(): Observable<Habilidades[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Habilidades[]>(this.apiUrl + `/habilidades/tipo-habilidad/Profesionales`, httpOptions)
  }


  getCandidatoHabilidades(filtros:string): Observable<Habilidadescandidato[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Habilidadescandidato[]>(this.apiUrl + `/candidato-habilidades/habilidades?habilidades=${filtros}`, httpOptions);
  }


}


