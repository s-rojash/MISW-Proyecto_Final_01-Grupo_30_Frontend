import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpApiAuthenticationInterceptorService {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiToken = localStorage.getItem("API_TOKEN");
    if (apiToken !== null && apiToken !== ""){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${apiToken}`
        }
      });
    }
    return next.handle(request);
  }
}
