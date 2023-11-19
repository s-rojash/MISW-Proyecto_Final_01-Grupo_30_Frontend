/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BancoPreguntasListComponent } from './banco-preguntas-list.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoriasListComponent } from '../categorias-list/categorias-list.component';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { of } from 'rxjs';
import { BancoPreguntas } from '../banco-preguntas';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('BancoPreguntasListComponent', () => {
  let component: BancoPreguntasListComponent;
  let fixture: ComponentFixture<BancoPreguntasListComponent>;
  let bancoPreguntasService: BancoPreguntasService;

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
      declarations: [ BancoPreguntasListComponent, CategoriasListComponent ],
      providers: [BancoPreguntasService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoPreguntasListComponent);
    component = fixture.componentInstance;
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getListaPreguntas getListaBancosPreguntas and return response success", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    let response: BancoPreguntas[] = [{ id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected: false }];

    spyOn(bancoPreguntasService, 'getListaBancosPreguntas').and.returnValue(of(response));
    component.idCategoriaSeleccionada = 1;

    component.getListaPreguntas();
    fixture.detectChanges();
    expect(component.listaBancosPreguntas).toEqual(response);
  });

  it("should call getListaPreguntas getListaBancosPreguntas with idCategoriaSeleccionada null", () => {
    const categoria = { id: 1, nombre: 'sojash' };
    let response: BancoPreguntas[] = [{ id: 1, idEmpresa: 1, tipoBanco: '', categoria, selected: false }];

    spyOn(bancoPreguntasService, 'getListaBancosPreguntas').and.returnValue(of(response));

    component.getListaPreguntas();
    fixture.detectChanges();
    expect(component.listaBancosPreguntas).toHaveSize(0);
  });

  it("should call categoriaSeleccionada and fill the value nombreCategoriaSeleccionada", () => {
    const datoscategoria = { idCategoriaSeleccionada: 1, nombreCategoriaSeleccionada: 'sojash' };

    spyOn(component, 'getListaPreguntas');
    component.categoriaSeleccionada(datoscategoria);
    fixture.detectChanges();
    expect(component.nombreCategoriaSeleccionada).toEqual(datoscategoria.nombreCategoriaSeleccionada);
    expect(component.getListaPreguntas).toHaveBeenCalled();
  });

  it("should call categoriaSeleccionada and fill the value nombreCategoriaSeleccionada html", () => {
    const datoscategoria = { idCategoriaSeleccionada: 1, nombreCategoriaSeleccionada: 'java' };

    component.categoriaSeleccionada(datoscategoria);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.card-title');
    expect(element.textContent).toContain(datoscategoria.nombreCategoriaSeleccionada);
  });

  it("should call getListaPreguntas getListaBancosPreguntas and return response success html", () => {
    const categoria = { id: 1, nombre: 'java' };
    const categoria2 = { id: 2, nombre: 'c' };
    let response: BancoPreguntas[] = [{ id: 1, idEmpresa: 1, tipoBanco: '', categoria:categoria, selected: false }, { id: 2, idEmpresa: 2, tipoBanco: '', categoria:categoria2, selected: false }];

    const datoscategoria = { idCategoriaSeleccionada: 2, nombreCategoriaSeleccionada: 'c' };
    component.categoriaSeleccionada(datoscategoria);

    spyOn(bancoPreguntasService, 'getListaBancosPreguntas').and.returnValue(of(response));

    component.getListaPreguntas();
    fixture.detectChanges();
    expect(component.listaBancosPreguntas).toEqual(response);

    const elements= fixture.nativeElement.querySelectorAll('td');
    console.log(elements.length);
    expect(elements[0].textContent).toEqual(categoria.nombre);
    expect(elements[3].textContent).toEqual(categoria2.nombre);
  });
});

