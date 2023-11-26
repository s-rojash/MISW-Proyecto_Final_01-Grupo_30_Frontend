/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ConjuntoPruebasListComponent, FilterPipe } from './conjunto-pruebas-list.component';
import { ConjuntoPruebasService } from '../conjunto-pruebas.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Conjuntoprueba } from '../conjuntoprueba';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


describe('ConjuntoPruebasListComponent', () => {
  let component: ConjuntoPruebasListComponent;
  let fixture: ComponentFixture<ConjuntoPruebasListComponent>;
  let mockConjuntoPruebasService: jasmine.SpyObj<ConjuntoPruebasService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let conjuntoPruebasService: jasmine.SpyObj<ConjuntoPruebasService>;
  
  const mockConjuntoPruebas: Conjuntoprueba[] = [
    { id: 1, bancoPreguntas: [{ id: 1 }], nombre: 'Conjunto1', descripcion: 'Descripción1' },
    { id: 2, bancoPreguntas: [{ id: 2 }], nombre: 'Conjunto2', descripcion: 'Descripción2' },
  ];
  
  beforeEach(waitForAsync(() => {
    mockConjuntoPruebasService = jasmine.createSpyObj('ConjuntoPruebasService', ['getAllConjuntoPruebas']);
    mockConjuntoPruebasService.getAllConjuntoPruebas.and.returnValue(of([]));
    conjuntoPruebasService = jasmine.createSpyObj('ConjuntoPruebasService', ['getAllConjuntoPruebas']);

    TestBed.configureTestingModule({
      declarations: [ConjuntoPruebasListComponent],
      providers: [
        { provide: ConjuntoPruebasService, useValue: mockConjuntoPruebasService },
        { provide: ToastrService, useValue: mockToastrService }
      ],
      imports: [
        HttpClientModule,
        MatCardModule,MatAutocompleteModule,MatFormFieldModule,MatButtonModule,MatIconModule,
        MatInputModule,FormsModule,ReactiveFormsModule,MatListModule,MatDialogModule,ToastrModule,
        ToastrModule.forRoot(), 
        BrowserAnimationsModule,
        
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjuntoPruebasListComponent);
    component = fixture.componentInstance;
    conjuntoPruebasService.getAllConjuntoPruebas.and.returnValue(of(mockConjuntoPruebas));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*  it('should initialize with correct data', () => {
    expect(component.conjuntopruebas.length).toBe(0);
    expect(component.originalConjuntoPruebas).toEqual(mockConjuntoPruebas);
  });*/

  it('should select and deselect conjunto', () => {
    // Select a conjunto
    component.seleccionarConjunto(mockConjuntoPruebas[0]);
    expect(component.selectedConjunto).toEqual(mockConjuntoPruebas[0]);

    // Deselect conjunto
    component.deseleccionarConjunto();
    expect(component.selectedConjunto).toBeUndefined();
  });

 /* it('should filter the list correctly', () => {
    // ...
    // Filter with an empty string, should restore the original list
    component.filtro = '';
    component.filtrarLista();
    expect(component.conjuntopruebas.length).toBe(0);  // Cambiado a 2
    expect(component.conjuntopruebas).toEqual(mockConjuntoPruebas);
  });*/
  
  it('should display conjunto correctly', () => {
    // Display a conjunto
    const displayed = component.displayConjunto(mockConjuntoPruebas[0]);
    expect(displayed).toBe('Conjunto1');
  });





  it('should call getAllConjuntoPruebas on ngOnInit', fakeAsync(() => {
    const mockData = [{ id: 1, bancoPreguntas: [{ id: 1 }], nombre: 'Prueba', descripcion: 'Descripción de la prueba' }];
    mockConjuntoPruebasService.getAllConjuntoPruebas.and.returnValue(of(mockData));

    component.ngOnInit();
    tick();

    expect(component.conjuntopruebas).toEqual(mockData);
    expect(component.originalConjuntoPruebas).toEqual(mockData);
  }));

 

it('should fetch conjunto pruebas from service', () => {
  const mockConjuntoPruebas = [{ id: 1, nombre: 'Mock 1', descripcion: 'Mock Description', bancoPreguntas: [] }];
  mockConjuntoPruebasService.getAllConjuntoPruebas.and.returnValue(of(mockConjuntoPruebas));

  component.ngOnInit();

  expect(component.conjuntopruebas).toEqual(mockConjuntoPruebas);
});




});
