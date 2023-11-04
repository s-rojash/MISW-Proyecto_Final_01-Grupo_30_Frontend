/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProgramEvaluationComponent } from './program-evaluation.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('ProgramEvaluationComponent', () => {
  let component: ProgramEvaluationComponent;
  let fixture: ComponentFixture<ProgramEvaluationComponent>;
  let toastrService: ToastrService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule,
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
        })
      ],
      declarations: [ ProgramEvaluationComponent ],
      providers: [ ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramEvaluationComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    const date = new Date('10/28/2023');
    component.programEForm.patchValue({ candidatos: '0', tipopruebas: '0', fechaprueba: date });
    fixture.detectChanges();
    expect(component.programEForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.programEForm.patchValue({ candidatos: '1', tipopruebas: '1', fechaprueba: '' });
    fixture.detectChanges();
    expect(component.programEForm.valid).toBeFalsy();
  });

  it('go to programEvaluation test', () => {
    spyOn(component, 'programEvaluation');
    const date = new Date('10/28/2023');
    component.programEForm.patchValue({ candidatos: '0', tipopruebas: '0', fechaprueba: date });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(component.programEvaluation).toHaveBeenCalled();
  });

  it('select applicant failed test', () => {
    spyOn(toastrService, 'error');
    const date = new Date('10/28/2023');
    component.programEForm.patchValue({ candidatos: '0', tipopruebas: '1', fechaprueba: date });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('select bank failed test', () => {
    spyOn(toastrService, 'error');
    const date = new Date('10/28/2023');
    component.programEForm.patchValue({ candidatos: '1', tipopruebas: '0', fechaprueba: date });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(toastrService.error).toHaveBeenCalled();
  });
});
