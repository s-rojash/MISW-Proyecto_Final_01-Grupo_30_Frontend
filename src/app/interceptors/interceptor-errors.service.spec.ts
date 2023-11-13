import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptorService } from './interceptor-errors.service';
import { environment } from 'src/environments/environment';

describe('InterceptorsServiceService', () => {
  let service: HttpErrorInterceptorService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let UrlCandidatos: string = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ToastrModule.forRoot(), HttpClientTestingModule],
        providers: [
          HttpErrorInterceptorService,  // Replace with the actual name of your interceptor
          {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptorService,
            multi: true,
          },
        ],
        });
    service = TestBed.inject(HttpErrorInterceptorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept and handle client-side error', () => {
    const url = UrlCandidatos + '/candidatos/';
    const errorEvent = new ErrorEvent('Test error');
    const errorMessage = 'Client-side error message';

    httpClient.get(url).subscribe({
      next:() => fail('Client-side error message'),
      error:() => (error: HttpErrorResponse) => {
        expect(error.error).toBe(errorMessage);
      }
    }
    );

    const req = httpTestingController.expectOne(url);
    req.error(errorEvent, { status: 400, statusText: 'Bad Request' });
  });

  it('should intercept and handle server-side error', () => {
    const url = '/api/some-endpoint';
    const serverErrorMessage = 'Server error message';

    httpClient.get(url).subscribe({
      next:() => fail('Server error message'),
      error:() => (error: HttpErrorResponse) => {
        expect(error.error).toBe(serverErrorMessage);
      }
    }
    );

    const req = httpTestingController.expectOne(url);
    req.flush(serverErrorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
