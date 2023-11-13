import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HttpApiAuthenticationInterceptorService } from './interceptor-api-authentication.service';

describe('InterceptorsServiceService', () => {
  let service: HttpApiAuthenticationInterceptorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ToastrModule.forRoot(), HttpClientTestingModule],
        providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpApiAuthenticationInterceptorService, // Replace with the actual name of your interceptor
            multi: true,
          },
        ],
        });
    service = TestBed.inject(HttpApiAuthenticationInterceptorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Authorization header with token if API_TOKEN is present', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, controller: HttpTestingController) => {
      const apiToken = 'your-api-token';
      localStorage.setItem('API_TOKEN', apiToken);

      // Make a request to trigger the interceptor
      http.get('/some-api-endpoint').subscribe(response => {
        // Add your expectations on the response here
      });

      // Expect a single request to a specific endpoint
      const req = httpTestingController.expectOne('/some-api-endpoint');

      // Assert that the Authorization header is set with the correct token
      expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${apiToken}`);

      // Flush the request and respond with a mock response
      req.flush({ data: 'some data' });

      // Verify that there are no outstanding requests
      httpTestingController.verify();
    }
  ));

  it('should not add Authorization header if API_TOKEN is not present', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, controller: HttpTestingController) => {
      localStorage.removeItem('API_TOKEN');

      // Make a request to trigger the interceptor
      http.get('/some-api-endpoint').subscribe(response => {
        // Add your expectations on the response here
      });

      // Expect a single request to a specific endpoint
      const req = httpTestingController.expectOne('/some-api-endpoint');

      // Assert that the Authorization header is not present
      expect(req.request.headers.has('Authorization')).toBeFalse();

      // Flush the request and respond with a mock response
      req.flush({ data: 'some data' });

      // Verify that there are no outstanding requests
      httpTestingController.verify();
    }
  ));
});
