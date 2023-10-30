import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpApiAuthenticationInterceptorService } from './interceptor-api-authentication.service';

describe('InterceptorsServiceService', () => {
  let service: HttpApiAuthenticationInterceptorService;


  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ToastrModule.forRoot()],
        });
    service = TestBed.inject(HttpApiAuthenticationInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
