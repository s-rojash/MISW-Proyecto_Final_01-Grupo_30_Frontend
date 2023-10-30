/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { of } from 'rxjs';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let toastrService: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
        }),
        ToastrModule.forRoot({
          timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }),],
      declarations: [ LoginPageComponent ],
      providers: [ ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.loginForm.patchValue({ email: 'prueba@test.com', password: 'sadsa' });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.loginForm.patchValue({ email: 'asdasdfds', password: 'sadsa' });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('two fields empty', () => {
    component.loginForm.patchValue({ email: '', password: '' });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email empty', () => {
    component.loginForm.patchValue({ email: '', password: 'sadsa' });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('password empty', () => {
    component.loginForm.patchValue({ email: 'prueba@test.com', password: '' });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('go to app test', () => {
    spyOn(component, 'goToApp');
    component.loginForm.patchValue({ email: 'prueba@test.com', password: 'sadsa' });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-login');
    element.click();
    fixture.detectChanges();
    expect(component.goToApp).toHaveBeenCalled();
  });

  it('go to app company failed', () => {
    spyOn(component, 'goToApp');
    spyOn(toastrService, 'error');
    component.loginForm.patchValue({ email: 'prueba@test.com', password: 'sadsa' });
    component.selectedtypeLogin = "0";
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-login');
    element.click();
    fixture.detectChanges();
    expect(component.goToApp).toHaveBeenCalled();
    // const service = TestBed.get(LoginService);
    // spyOn(service, 'loginCompany');
    // expect(service.loginCompany).toHaveBeenCalledWith();
    //expect(toastrService.error).toHaveBeenCalled();
  });
});
