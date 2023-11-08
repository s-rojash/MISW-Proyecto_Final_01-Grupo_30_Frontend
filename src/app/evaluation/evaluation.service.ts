import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Signupapplicant } from '../signup/signupapplicant';
import { environment } from 'src/environments/environment';
import { Evaluationtest } from './evaluationtest';
import { Evaluation } from './evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private apiUrlApplicant: string = environment.baseUrl + '/candidatos/';
  private apiUrlQuestionBank: string = environment.baseUrlBancoPreguntas + '/pruebas/';
  private apiUrlQuestionBankScheduleTest: string = environment.baseUrlBancoPreguntas + '/agendar-pruebas/';

  constructor(private http: HttpClient) { }

  getApplicants(): Observable<Signupapplicant[]> {
    return this.http.get<Signupapplicant[]>(this.apiUrlApplicant).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getTests(): Observable<Evaluationtest[]> {
    return this.http.get<Evaluationtest[]>(this.apiUrlQuestionBank ).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  createScheduleTest(test: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.apiUrlQuestionBankScheduleTest, test);
  }

  getAllScheduleTests(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.apiUrlQuestionBankScheduleTest ).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }

  getApplicant(id: string): Observable<Signupapplicant> {
    return this.http.get<Signupapplicant>(this.apiUrlApplicant + id).pipe(
      catchError(err => throwError(() => new Error('Error en el servicio')))
    );
  }
}
