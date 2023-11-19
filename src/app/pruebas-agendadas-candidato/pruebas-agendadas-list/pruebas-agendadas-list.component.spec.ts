/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PruebasAgendadasListComponent } from './pruebas-agendadas-list.component';
import { PruebasAgendadasService } from '../pruebas-agendadas.service';
import { of } from 'rxjs';
import { PruebaAgendada } from '../prueba-agendada';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('PruebasAgendadasListComponent', () => {
  let component: PruebasAgendadasListComponent;
  let fixture: ComponentFixture<PruebasAgendadasListComponent>;
  let pruebaAgendadaService: PruebasAgendadasService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientTestingModule,
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
      declarations: [ PruebasAgendadasListComponent ],
      providers: [PruebasAgendadasService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasAgendadasListComponent);
    component = fixture.componentInstance;
    pruebaAgendadaService = TestBed.inject(PruebasAgendadasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getListaCategorias getCategorias and return response success", () => {
    let response: PruebaAgendada[] = [{ id: 1, nombrePrueba: 'Prueba', fecha: '2023-12-10', estado: 'Asignada' }];

    //spyOn(pruebaAgendadaService, 'getCategorias').and.returnValue(of(response));

    // component.getListaCategorias();
    fixture.detectChanges();
    expect(component.listaCategorias).toEqual(response);
  });

});
