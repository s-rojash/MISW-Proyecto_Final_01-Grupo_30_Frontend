/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogtypesignupComponent } from './dialogtypesignup.component';
import { Router, NavigationExtras } from '@angular/router';
import { SignupApplicantComponent } from 'src/app/signup/signup-applicant/signup-applicant.component';
import { SignupCompanyComponent } from 'src/app/signup/signup-company/signup-company.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('DialogtypesignupComponent', () => {
  let component: DialogtypesignupComponent;
  let fixture: ComponentFixture<DialogtypesignupComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule,
        RouterTestingModule
        ,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
        })],
      declarations: [ DialogtypesignupComponent, SignupApplicantComponent, SignupCompanyComponent ],
      providers: [Router, MatDialog]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogtypesignupComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to signup company page', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    spyOn(router, 'navigateByUrl'); // Spy on the router's navigateByUrl method
    buttons[0].click();
    fixture.detectChanges();

    const urlTree = router.createUrlTree(['/signup/company']);

    const navigationExtras: NavigationExtras = {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined // You can customize the state object as needed
    };

    expect(router.navigateByUrl).toHaveBeenCalledWith(urlTree, navigationExtras);
  });

  it('navigate to signup applicant page', () => {
    spyOn(router, 'navigateByUrl');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();

    const urlTree = router.createUrlTree(['/signup/applicant']);

    const navigationExtras: NavigationExtras = {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined // You can customize the state object as needed
    };

    expect(router.navigateByUrl).toHaveBeenCalledWith(urlTree, navigationExtras);
  });
});
