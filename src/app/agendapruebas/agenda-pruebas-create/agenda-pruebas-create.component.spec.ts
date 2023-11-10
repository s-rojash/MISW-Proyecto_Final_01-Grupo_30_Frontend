/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgendaPruebasCreateComponent } from './agenda-pruebas-create.component';
import { AgendaPruebasListComponent } from '../agenda-pruebas-list/agenda-pruebas-list.component';
import { AgendaPruebaRoutingModule } from '../agenda-prueba-routing.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { AgendaPruebaService } from '../agenda-prueba.service';
import { of } from 'rxjs';
import { Candidato } from '../candidato';
import { BancoPreguntasService } from 'src/app/banco-preguntas/banco-preguntas.service';
import { Prueba } from 'src/app/banco-preguntas/prueba';
import { AgendaPrueba } from '../agenda-prueba';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('AgendaPruebasCreateComponent', () => {
  let component: AgendaPruebasCreateComponent;
  let fixture: ComponentFixture<AgendaPruebasCreateComponent>;
  let agendaPruebaService: AgendaPruebaService;
  let bancoPreguntasService: BancoPreguntasService;
  let toastrSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, AgendaPruebaRoutingModule, RouterTestingModule,
        MatDatepickerModule, MatNativeDateModule, MatSelectModule,
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
      })],
      declarations: [ AgendaPruebasCreateComponent, AgendaPruebasListComponent ],
      providers: [AgendaPruebaService, BancoPreguntasService, { provide: ToastrService, useValue: spy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaPruebasCreateComponent);
    component = fixture.componentInstance;
    agendaPruebaService = TestBed.inject(AgendaPruebaService);
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    const date = new Date('10/28/2023');

    component.agendaPruebaForm.patchValue({ idPrueba: '11', idCandidato: '11', fecha: date });
    fixture.detectChanges();
    expect(component.agendaPruebaForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    const date = new Date('10/28/2023');

    component.agendaPruebaForm.patchValue({ idPrueba: '', idCandidato: '', fecha: date });
    fixture.detectChanges();
    expect(component.agendaPruebaForm.valid).toBeFalsy();
  });

  it('all fields empty', () => {
    component.agendaPruebaForm.patchValue({ idPrueba: '', idCandidato: '', fecha: '' });
    fixture.detectChanges();
    expect(component.agendaPruebaForm.valid).toBeFalsy();
  });

  it('should return form inValid min lenght value', () => {
    const date = new Date('10/28/2023');

    component.agendaPruebaForm.patchValue({ idPrueba: '1', idCandidato: '1', fecha: date });
    fixture.detectChanges();
    expect(component.agendaPruebaForm.valid).toBeFalsy();
  });

  it("should call getListaCandidatos getListaCandidatos and return response success", () => {
    let response: Candidato[] = [{id: 1, numDocumento: 3212, apellidos: '1213', nombres: 'dfdfd', email: 'sdfsd', celular: '2111'}];

    spyOn(agendaPruebaService, 'getListaCandidatos').and.returnValue(of(response));

    component.getListaCandidatos();
    fixture.detectChanges();
    expect(component.listaCandidatos).toEqual(response);
  });

  it("should call getListaPruebas getListaPruebas and return response success", () => {
    let response: Prueba[] = [{id: 1, nombre: 'Prueba1', descripcion: 'Prueba1'}];

    spyOn(bancoPreguntasService, 'getListaPruebas').and.returnValue(of(response));

    component.getListaPruebas();
    fixture.detectChanges();
    expect(component.listaPruebas).toEqual(response);
  });

  it("should call createAgendaPrueba agendaPruebaForm is null", () => {
    const date = new Date('10/28/2023');
    let agenda: AgendaPrueba = { id: 1, idEmpresa: 1, idCandidato: 1, idPrueba: 1, fecha: date, puntos: 5, estado: 'pendiente' };

    component.createAgendaPrueba(agenda);
    fixture.detectChanges();
    expect(agenda.id).toBeNaN();
  });

  it("should call createAgendaPrueba saveListaAgendaPrueba and return response success", () => {
    const date = new Date('10/28/2023');
    let response: AgendaPrueba = { id: 1, idEmpresa: 1, idCandidato: 1, idPrueba: 1, fecha: date, puntos: 5, estado: 'pendiente' };

    spyOn(agendaPruebaService, 'saveListaAgendaPrueba').and.returnValue(of(response));

    component.createAgendaPrueba(response);
    fixture.detectChanges();
    expect(toastrSpy.success).toHaveBeenCalled();
  });
});
