import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { PrincipalPageComponent } from './principal/principal-page/principal-page.component';
import { SignupCompanyComponent } from './signup/signup-company/signup-company.component';
import { SignupApplicantComponent } from './signup/signup-applicant/signup-applicant.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translate: jasmine.SpyObj<TranslateService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: AppComponent },
          { path: 'login', component: LoginPageComponent },
          { path: 'principal', component: PrincipalPageComponent },
          { path: 'signup/company', component: SignupCompanyComponent },
          { path: 'signup/applicant', component: SignupApplicantComponent }
        ]),
        HttpClientModule, MatButtonModule, MatMenuModule, MatCardModule, MatIconModule, MatInputModule,
        BrowserAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatDividerModule, RouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            useClass: TranslateFakeLoader,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        AppComponent, MatMenuTrigger
      ],
      providers: [TranslateService, Router ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translate = jasmine.createSpyObj('TranslateService', ['setDefaultLang']);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'frontabc-front'`, () => {
    expect(component.title).toEqual('frontabc-front');
  });

  it('should contain router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });

  it('test spanish button', () => {
    component.showHead = true;
    component.showOptions = true;
    fixture.detectChanges();

    let element = fixture.nativeElement.querySelector('.bgimagefab');
    element.click();
    fixture.detectChanges();

    spyOn(component, 'changeLang');
    const menuItems = fixture.debugElement.queryAll(By.css('button[mat-button]'));
    menuItems[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.changeLang).toHaveBeenCalled();
  });

  it('test english button', () => {
    component.showHead = true;
    component.showOptions = true;
    fixture.detectChanges();

    let element = fixture.nativeElement.querySelector('.bgimagefab');
    element.click();
    fixture.detectChanges();

    spyOn(component, 'changeLang');
    const menuItems = fixture.debugElement.queryAll(By.css('button[mat-button]'));
    menuItems[1].nativeElement.click();
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

  it('navigate to root', () => {
    router.navigate(['/']);
    // Angular runs change detection asynchronously, so we need to run it manually
    fixture.detectChanges();

    // Expectations based on the URL provided in the mock event
    expect(component.showHead).toBe(false); // URL is '/login' or '/'
  });

  it('navigate to login page', () => {
    router.navigate(['/login']);
    // Angular runs change detection asynchronously, so we need to run it manually
    fixture.detectChanges();

    // Expectations based on the URL provided in the mock event
    expect(component.showHead).toBe(false); // URL is '/login' or '/'
  });

  it('navigate to principal page', () => {
    localStorage.setItem("API_TOKEN", "asjdshdjasjsghcuijkgfd2f1d25dfds");
    router.navigate(['/principal']);
    // Angular runs change detection asynchronously, so we need to run it manually
    fixture.detectChanges();

    // Expectations based on the URL provided in the mock event
    expect(component.showHead).toBe(true);
    expect(component.showOptions).toBe(true);
  });

  it('navigate to signup company page', () => {
    router.navigate(['/signup/company']);
    // Angular runs change detection asynchronously, so we need to run it manually
    fixture.detectChanges();

    // Expectations based on the URL provided in the mock event
    expect(component.showHead).toBe(true);
    expect(component.showOptions).toBe(false);
  });

  it('navigate to signup applicant page', () => {
    router.navigate(['/signup/applicant']);
    // Angular runs change detection asynchronously, so we need to run it manually
    fixture.detectChanges();

    // Expectations based on the URL provided in the mock event
    expect(component.showHead).toBe(true);
    expect(component.showOptions).toBe(false);
  });

  it('should navigate to principal page without token and return to login page', () => {
    localStorage.clear(); // Simulate no API_TOKEN
    router.navigate(['/principal']);
    fixture.detectChanges();
    console.log(router.url);
    expect(router.url).toEqual('/');
  });
});
