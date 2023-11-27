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
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BancoPreguntasCreateComponent } from './banco-preguntas-create.component';
import { BancoPreguntasListComponent } from '../banco-preguntas-list/banco-preguntas-list.component';
import { BancoPreguntasRoutingModule } from '../banco-preguntas-routing.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from "@angular/router/testing";
import { BancoPreguntasService } from '../banco-preguntas.service';
import { BancoPreguntas } from '../banco-preguntas';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria';
import { ListaPreguntasListComponent } from '../lista-preguntas/lista-preguntas-list.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('BancoPreguntasCreateComponent', () => {
  let component: BancoPreguntasCreateComponent,
  fixture: ComponentFixture<BancoPreguntasCreateComponent>,
  bancoPreguntasService: BancoPreguntasService,
  toastrSpy: jasmine.SpyObj<ToastrService>;
  let mockActivatedRoute: any;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ToastrService', ['success']);
    mockActivatedRoute = {
      params: of({ 'id?': '1' }) // Provide the necessary params for testing
    };

    TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatIconModule,
        MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, BancoPreguntasRoutingModule, RouterTestingModule,
        MatSelectModule, HttpClientTestingModule,
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
      declarations: [ BancoPreguntasCreateComponent, BancoPreguntasListComponent, ListaPreguntasListComponent ],
      providers: [Router, BancoPreguntasService, { provide: ToastrService, useValue: spy }, { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoPreguntasCreateComponent);
    component = fixture.componentInstance;
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return form Valid', () => {
    component.bancoPreguntasForm.patchValue({ tipoBanco: 'AA', categoria: '1' });
    fixture.detectChanges();
    expect(component.bancoPreguntasForm.valid).toBeTruthy();
  });

  it('should return form inValid', () => {
    component.bancoPreguntasForm.patchValue({ tipoBanco: '', categoria: '1' });
    fixture.detectChanges();
    expect(component.bancoPreguntasForm.valid).toBeFalsy();
  });

  it('should all fields empty', () => {
    component.bancoPreguntasForm.patchValue({ tipoBanco: '', categoria: '' });
    fixture.detectChanges();
    expect(component.bancoPreguntasForm.valid).toBeFalsy();
  });

  it('should return form inValid min lenght value', () => {
    component.bancoPreguntasForm.patchValue({ tipoBanco: 'A', categoria: '1' });
    fixture.detectChanges();
    expect(component.bancoPreguntasForm.valid).toBeFalsy();
  });

  it('createBancoPreguntas test', () => {
    spyOn(component, 'createBancoPreguntas');
    component.bancoPreguntasForm.patchValue({ tipoBanco: 'AA', categoria: '1' });
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.btn-primary');
    element.click();
    fixture.detectChanges();
    expect(component.createBancoPreguntas).toHaveBeenCalled();
  });

  it("should call createBancoPreguntas createBancoPreguntas and return response success", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    const bancopreguntas: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected:false};
    let response: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected: false };

    spyOn(bancoPreguntasService, 'createBancoPreguntas').and.returnValue(of(response));

    component.createBancoPreguntas(bancopreguntas);
    fixture.detectChanges();
    expect(toastrSpy.success).toHaveBeenCalled();
  });

  it("should call cancelCreation and reset the form", () => {
    component.bancoPreguntasForm.patchValue({ tipoBanco: 'AA', categoria: '1' });
    fixture.detectChanges();
    expect(component.bancoPreguntasForm.valid).toBeTruthy();

    component.cancelCreation();
    fixture.detectChanges();
    expect(component.bancoPreguntasForm.get('tipoBanco')?.value).toBeNull();
  });

  it("should call getListaCategorias getCategorias and return response success", () => {
    let response: Categoria[] = [{ id: 1, nombre: 'sojash' }];

    spyOn(bancoPreguntasService, 'getCategorias').and.returnValue(of(response));

    component.getListaCategorias();
    fixture.detectChanges();
    expect(component.listaCategorias).toEqual(response);
  });

  it("should call ngOnInit bancoPreguntasId is not null", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    let response: BancoPreguntas = { id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected: false };

    spyOn(bancoPreguntasService ,'getBancoPreguntas').and.returnValue(of(response));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.listaPreguntasVisible).toBe(true);
  });

  it("should call ngOnInit bancoPreguntasId is null", () => {
    component.bancoPreguntasId = null;
    spyOn(component ,'ngOnInit');
    component.ngOnInit();

    fixture.detectChanges();
    expect(component.listaPreguntasVisible).toBe(false);
  });
});
