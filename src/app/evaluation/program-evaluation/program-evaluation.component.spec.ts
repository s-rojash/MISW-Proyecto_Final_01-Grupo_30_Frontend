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
    const prueba = { id: '1' };

    component.programEForm.patchValue({ idCandidato: '1', prueba: prueba, fecha: date, puntos: 0, estado: "pendiente" });
    fixture.detectChanges();
    expect(component.programEForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    const prueba = { id: '1' };
    component.programEForm.patchValue({ idCandidato: '1', prueba: prueba, fecha: '', puntos: 0, estado: "pendiente" });
    fixture.detectChanges();
    expect(component.programEForm.valid).toBeFalsy();
  });

  it('go to programEvaluation test', () => {
    const date = new Date('10/28/2023');
    const prueba = { id: '1' };

    spyOn(component, 'programEvaluation');
    component.programEForm.patchValue({ idCandidato: '1', prueba: prueba, fecha: date, puntos: 0, estado: "pendiente" });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(component.programEvaluation).toHaveBeenCalled();
  });

  it('select applicant failed test', () => {
    const date = new Date('10/28/2023');
    const prueba = { id: '1' };

    spyOn(toastrService, 'error');
    component.programEForm.patchValue({ idCandidato: '0', prueba: prueba, fecha: date, puntos: 0, estado: "pendiente" });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('select bank failed test', () => {
    const date = new Date('10/28/2023');
    const prueba = { id: '0' };

    spyOn(toastrService, 'error');
    component.programEForm.patchValue({ idCandidato: '1', prueba: prueba, fecha: date, puntos: 0, estado: "pendiente" });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.button-signup');
    element.click();
    fixture.detectChanges();
    expect(toastrService.error).toHaveBeenCalled();
  });
});
