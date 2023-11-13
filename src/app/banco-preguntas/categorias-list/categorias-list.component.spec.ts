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
import { CategoriasListComponent } from './categorias-list.component';
import { BancoPreguntasService } from '../banco-preguntas.service';
import { of } from 'rxjs';
import { Categoria } from '../categoria';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

describe('CategoriasListComponent', () => {
  let component: CategoriasListComponent;
  let fixture: ComponentFixture<CategoriasListComponent>;
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
      declarations: [ CategoriasListComponent ],
      providers: [BancoPreguntasService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasListComponent);
    component = fixture.componentInstance;
    bancoPreguntasService = TestBed.inject(BancoPreguntasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getListaCategorias getCategorias and return response success", () => {
    let response: Categoria[] = [{ id: 1, nombre: 'sojash' }];

    spyOn(bancoPreguntasService, 'getCategorias').and.returnValue(of(response));
    component.idCategoriaSeleccionada = 1;

    component.getListaCategorias();
    fixture.detectChanges();
    expect(component.listaCategorias).toEqual(response);
  });

  it('should set idCategoriaSeleccionada and emit categoriaSeleccionada event', () => {
    // Arrange
    const id = 1;
    const nombre = 'TestCategory';

    // Create a spy for the emit method of categoriaSeleccionada
    spyOn(component.categoriaSeleccionada, 'emit');
    component.seleccionarCategoria(id, nombre);

    expect(component.idCategoriaSeleccionada).toBe(id);
    expect(component.categoriaSeleccionada.emit).toHaveBeenCalledWith({
      idCategoriaSeleccionada: id,
      nombreCategoriaSeleccionada: nombre,
    });
  });

  it('should call getListaCategorias getCategorias and return response success html', () => {
    let response: Categoria[] = [{ id: 1, nombre: 'sojash' }, { id: 2, nombre: 'java' }, { id: 3, nombre: 'php' }];

    spyOn(bancoPreguntasService, 'getCategorias').and.returnValue(of(response));
    component.idCategoriaSeleccionada = 1;

    component.getListaCategorias();
    fixture.detectChanges();

    const elements= fixture.nativeElement.querySelectorAll('li');
    expect(elements[0].textContent).toEqual(' ' + response[0].nombre + ' ');
    expect(elements[1].textContent).toEqual(' ' + response[1].nombre + ' ');
    expect(elements[2].textContent).toEqual(' ' + response[2].nombre + ' ');
  });
});
