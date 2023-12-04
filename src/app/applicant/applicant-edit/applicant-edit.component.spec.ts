/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
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
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApplicantEditComponent } from './applicant-edit.component';
import { ApplicantService } from '../applicant.service';
import { of } from 'rxjs';
import { Applicant } from '../applicant';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ApplicantEditComponent', () => {
  let component: ApplicantEditComponent;
  let fixture: ComponentFixture<ApplicantEditComponent>;
  let translate: jasmine.SpyObj<TranslateService>;
  let applicantService: ApplicantService;
  let pass2 = '12345';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule,
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
        }),
      ],
      declarations: [ ApplicantEditComponent ],
      providers: [ToastrService, TranslateService, ApplicantService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantEditComponent);
    component = fixture.componentInstance;
    applicantService = TestBed.inject(ApplicantService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call selectChangeHandler and change value of select 2", () => {
    const event = { target: { value: '2' }};
    component.selectChangeHandler(event);
    fixture.detectChanges();
    expect(component.selectedtypeNIT).toEqual('2');
  });

  it("should call getApplicant getApplicant and return response success", () => {
    const date = new Date('10/28/2023');
    const date2 = new Date('10/28/2023');

    const response: Applicant = { id: 1, nombres: "Steve", apellidos: "Rojas", tipoDocumento: "C.C.",
          numDocumento: 1234, celular: "3183104480", email: "s.rojash@uniandes.edu.co", password: pass2,
          token: "sdasda", expireAt: date, createdAt: date2 };

    spyOn(applicantService, 'getApplicant').and.returnValue(of(response));

    component.getApplicant();
    fixture.detectChanges();
    expect(component.applicantRForm.get('id')?.value).toBe(1);
  });
});
