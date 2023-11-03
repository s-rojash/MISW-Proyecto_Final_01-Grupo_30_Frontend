/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

import { DialogalertopappliComponent } from './dialogalertopappli.component';

describe('DialogalertopappliComponent', () => {
  let component: DialogalertopappliComponent;
  let fixture: ComponentFixture<DialogalertopappliComponent>;
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
      declarations: [ DialogalertopappliComponent ],
      providers: [Router, MatDialog]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogalertopappliComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to login page dialog 1 success', () => {
    component.iddialog = '1';
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    spyOn(router, 'navigateByUrl'); // Spy on the router's navigateByUrl method
    buttons[0].click();
    fixture.detectChanges();

    const urlTree = router.createUrlTree(['/']);

    const navigationExtras: NavigationExtras = {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined // You can customize the state object as needed
    };

    expect(router.navigateByUrl).toHaveBeenCalledWith(urlTree, navigationExtras);
  });

  it('navigate to login page dialog 2 failed', () => {
    component.iddialog = '2';
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    spyOn(router, 'navigateByUrl'); // Spy on the router's navigateByUrl method
    buttons[0].click();
    fixture.detectChanges();

    const urlTree = router.createUrlTree(['/']);

    const navigationExtras: NavigationExtras = {
      skipLocationChange: false,
      replaceUrl: false,
      state: undefined // You can customize the state object as needed
    };

    expect(router.navigateByUrl).toHaveBeenCalledWith(urlTree, navigationExtras);
  });
});
