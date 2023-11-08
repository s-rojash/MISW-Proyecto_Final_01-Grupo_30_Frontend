/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService} from '@ngx-translate/core';
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
import { Login } from '../login';
import { RouterTestingModule } from "@angular/router/testing";
import { PrincipalPageComponent } from '../../principal/principal-page/principal-page.component';
import { of, throwError } from 'rxjs';
import { DialogtypesignupComponent } from '../dialogtypesignup/dialogtypesignup.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let toastrService: ToastrService;
  let loginService: LoginService;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  let translate: jasmine.SpyObj<TranslateService>;
  let pass = 'sadsa';
  let pass2 = '12345';
  window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{path: 'principal', component: PrincipalPageComponent}]
        ),
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          useClass: TranslateFakeLoader,
          deps: [HttpClient]
        }
        }),
        ToastrModule.forRoot({
          timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }),],
      declarations: [ LoginPageComponent, PrincipalPageComponent, DialogtypesignupComponent ],
      providers: [ ToastrService, LoginService, TranslateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    loginService = TestBed.inject(LoginService);
    translate = jasmine.createSpyObj('TranslateService', ['setDefaultLang']);
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.loginForm.patchValue({ email: 'prueba@test.com', password: pass });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.loginForm.patchValue({ email: 'asdasdfds', password: pass });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('two fields empty', () => {
    component.loginForm.patchValue({ email: '', password: '' });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email empty', () => {
    component.loginForm.patchValue({ email: '', pass });
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
    component.loginForm.patchValue({ email: 'prueba@test.com', password: pass });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-login');
    element.click();
    fixture.detectChanges();
    expect(component.goToApp).toHaveBeenCalled();
  });

  it("should call gotoApp loginCompany and return response success", waitForAsync(() => {
    localStorage.clear();
    const login: Login = { id:1, email: 's.rojash@uniandes.edu.', password: pass2 ,token:'' };
    let response:Login = { id:5, email: 's.rojash@uniandes.edu.', password: pass2 ,token:'' };

    spyOn(loginService, 'loginCompany').and.returnValue(of(response));
    spyOn(toastrService, 'success');

    component.goToApp(login);

    fixture.detectChanges();
    console.log(localStorage.getItem("API_EMPRESA_ID"));
    expect(localStorage.getItem("API_EMPRESA_ID")).toEqual("5");
  }));

  it("should call gotoApp loginCompany and return response failed", waitForAsync(() => {
    localStorage.clear();
    const login: Login = { id:1, email: 's.rojash@uniandes.edu.', password: pass2, token:'' };

    spyOn(loginService, 'loginCompany').and.returnValue(throwError(() => ({ status: 404 })));
    spyOn(toastrService, 'error');

    component.goToApp(login);

    fixture.detectChanges();
    console.log(localStorage.getItem("API_EMPRESA_ID"));
    expect(localStorage.getItem("API_EMPRESA_ID")).toEqual(null);
  }));

  it("should call gotoApp loginApplicant and return response success", waitForAsync(() => {
    localStorage.clear();
    const login: Login = { id:1, email: 's.rojash@uniandes.edu.', password: pass2, token:'' };
    let response:Login = { id:5, email: 's.rojash@uniandes.edu.', password: pass2, token:'' };

    spyOn(toastrService, 'success');
    spyOn(loginService, 'loginApplicant').and.returnValue(of(response));

    component.selectedtypeLogin = "1";
    component.goToApp(login);

    fixture.detectChanges();


    console.log(localStorage.getItem("API_CANDIDATO_ID"));
    expect(localStorage.getItem("API_CANDIDATO_ID")).toEqual("5");
  }));

  it("should call gotoApp loginApplicant and return response failed", waitForAsync(() => {
    localStorage.clear();
    const login: Login = { id:1, email: 's.rojash@uniandes.edu.', password: pass2, token:'' };

    spyOn(loginService, 'loginApplicant').and.returnValue(throwError(() => ({ status: 404 })));
    spyOn(toastrService, 'error');

    component.selectedtypeLogin = "1";
    component.goToApp(login);

    fixture.detectChanges();
    console.log(localStorage.getItem("API_CANDIDATO_ID"));
    expect(localStorage.getItem("API_CANDIDATO_ID")).toEqual(null);
  }));

  it('go to open dialog', () => {
    spyOn(component, 'openDialog');
    const element = fixture.nativeElement.querySelector('a[style*="cursor: pointer;"]');
    element.click();
    fixture.detectChanges();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it("should call open dialog and return a result", waitForAsync(() => {
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  }));

  it("should call selectChangeHandler and change value of select 1", waitForAsync(() => {
    const event = { target: { value: '1' }};
    component.selectChangeHandler(event);
    expect(component.selectedtypeLogin).toEqual('1');
  }));

  it("should call selectChangeHandler and change value of select 2", waitForAsync(() => {
    const event = { target: { value: '2' }};
    component.selectChangeHandler(event);
    expect(component.selectedtypeLogin).toEqual('2');
  }));

  it('test spanish button', () => {
    spyOn(component, 'changeLang');
    let elements = fixture.nativeElement.querySelectorAll('.bgiconlanguages');
    elements[0].click();
    fixture.detectChanges();
    expect(component.changeLang).toHaveBeenCalled();
  });

  it('test english button', () => {
    spyOn(component, 'changeLang');
    let elements = fixture.nativeElement.querySelectorAll('.bgiconlanguages');
    elements[1].click();
    fixture.detectChanges();
    expect(component.changeLang).toHaveBeenCalled();
  });

  it('change not language', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    // Call the method in your service that triggers setDefaultLang
    component.translatelang(translate);

    // Verify that setDefaultLang was called with the correct language
    expect(translate.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('change spanish language', () => {
    spyOn(localStorage, 'getItem').and.returnValue('es');

    // Call the method in your service that triggers setDefaultLang
    component.translatelang(translate);

    // Verify that setDefaultLang was called with the correct language
    expect(translate.setDefaultLang).toHaveBeenCalledWith('es');
  });

  it('change english language', () => {
    spyOn(localStorage, 'getItem').and.returnValue('en');

    // Call the method in your service that triggers setDefaultLang
    component.translatelang(translate);

    // Verify that setDefaultLang was called with the correct language
    expect(translate.setDefaultLang).toHaveBeenCalledWith('en');
  });
});
