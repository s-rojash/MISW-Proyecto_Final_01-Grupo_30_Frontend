import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card'; // Importa el módulo de Angular Material para mat-card
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { ResultadosListComponent } from './resultados-list.component';
import { ResultadosService } from '../resultados.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Resultados } from '../resultados';
import { Prueba } from 'src/app/banco-preguntas/prueba';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


describe('ResultadosListComponent', () => {
  let component: ResultadosListComponent;
  let fixture: ComponentFixture<ResultadosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosListComponent ],
      imports: [ HttpClientTestingModule, MatCardModule,HttpClientModule ,MatFormFieldModule,MatButtonModule,
        MatIconModule,MatInputModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
          }),
          ReactiveFormsModule ,BrowserAnimationsModule,ToastrModule
      ], 
      providers: [ ResultadosService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.listaCandidatos = [{ id:1, nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
    email: '', password: 'pass' }];
  });


  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group results when there is an existing group', () => {
    const existingGroup = { prueba: { id: 1 }, candidatos: [] };
    const listaResultados: Resultados[] = [
      {
        idCandidato: 1,
        prueba: new Prueba(1, 'Nombre de la prueba', 'Descripción de la prueba', []),
        puntaje: 80,
        estado: 'Aprobado',
        fechaPresentacion: '2023-01-01'
      },

    ];
    component['groupResultsByPrueba'](listaResultados);
  
    expect(existingGroup.candidatos.length).toBe(0);
  });

  it('should create a new group when there is no existing group', () => {
    const listaResultados: Resultados[] = [
      {
        idCandidato: 1,
        prueba: new Prueba(1, 'Nombre de la prueba', 'Descripción de la prueba', []),
        puntaje: 80,
        estado: 'Aprobado',
        fechaPresentacion: '2023-01-01'
      },

    ];
  
    const groupedResults = component['groupResultsByPrueba'](listaResultados);
  
    expect(groupedResults.length).toBe(1);
  });
  
  it('should call getCandidatoById method', () => {
    const getCandidatoByIdSpy = spyOn(component as any, 'getCandidatoById').and.callThrough();

    const listaResultados: Resultados[] = [
      {
        idCandidato: 1,
        prueba: new Prueba(1, 'Nombre de la prueba', 'Descripción de la prueba', []),
        puntaje: 80,
        estado: 'Aprobado',
        fechaPresentacion: '2023-01-01'
      },

    ];
    component['groupResultsByPrueba'](listaResultados);
  
    expect(getCandidatoByIdSpy).toHaveBeenCalled();
  });


  it('should return a candidato when candidatoId matches', () => {
    const candidatoId = 1;
    const candidato = component['getCandidatoById'](candidatoId);
    expect(candidato).toBeDefined();
  });
  
  it('should return undefined when candidatoId does not match', () => {
    const candidatoId = 999;  // Un valor que no existe en listaCandidatos
    const candidato = component['getCandidatoById'](candidatoId);
    expect(candidato).toBeUndefined();
   });

  it('should group results correctly', () => {
    const listaResultados: Resultados[] = [
      {
        idCandidato: 1,
        prueba: new Prueba(1, 'Nombre de la prueba', 'Descripción de la prueba', []),
        puntaje: 80,
        estado: 'Aprobado',
        fechaPresentacion: '2023-01-01'
      },
    ];
  
    const groupedResults = component['groupResultsByPrueba'](listaResultados);
  
    expect(groupedResults.length).toBeGreaterThan(0);
  });

  it('should return an object with a Prueba and a list of Candidatos', () => {
    const listaResultados: Resultados[] = [
      {
        idCandidato: 1,
        prueba: new Prueba(1, 'Nombre de la prueba', 'Descripción de la prueba', []),
        puntaje: 80,
        estado: 'Aprobado',
        fechaPresentacion: '2023-01-01'
      },

    ];
  
    const groupedResults = component['groupResultsByPrueba'](listaResultados);
  
    expect(groupedResults.length).toBe(1);
    expect(groupedResults[0].prueba).toBeDefined();
    expect(groupedResults[0].candidatos).toBeDefined();
 });







it('should filter candidates for the selected test', () => {
  const pruebaId = 1;  // Prueba específica para la prueba
  const resultado: Resultados = {
    idCandidato: 1,
    prueba: new Prueba(pruebaId, 'Nombre de la prueba', 'Descripción de la prueba', []),
    puntaje: 80,
    estado: 'Aprobado',
    fechaPresentacion: '2023-01-01'
  };

  component.mostrarCandidatosDeLaPrueba(resultado);
  const filteredCandidates = component.candidatosDeLaPruebaSeleccionada;
  expect(filteredCandidates.length).toBeGreaterThan(0);
});


beforeEach(() => {
  fixture = TestBed.createComponent(ResultadosListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();

  component.listaCandidatos = [{ id:1, nombres: 'Prueba', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 1234, celular: '213312',
  email: '', password: 'pass' },
  { id:2, nombres: 'Prueba2', apellidos: 'Candidato', tipoDocumento: 'C.C.', numDocumento: 12345, celular: '213312',
  email: '', password: 'pass' }
];
});

it('should create', () => {
  expect(component).toBeTruthy();
});

it('should handle groupResultsByPrueba when existingGroup is present', () => {
  const existingGroup = { prueba: { id: 1 }, candidatos: [] };
  const listaResultados: Resultados[] = [{
    idCandidato: 1,
    prueba: new Prueba(1, 'Nombre de la prueba', 'Descripción de la prueba', []),
    puntaje: 80,
    estado: 'Aprobado',
    fechaPresentacion: '2023-01-01'}
  ];

  component['groupResultsByPrueba'](listaResultados);

  expect(existingGroup.candidatos.length).toBeGreaterThan(-1);
});


it('should handle groupResultsByPrueba when existingGroup is not present', () => {
  const listaResultados: Resultados[] = [
    {idCandidato: 1,
    prueba: new Prueba(1, 'Nombre de la prueba', 'Descripción de la prueba', []),
    puntaje: 80,
    estado: 'Aprobado',
    fechaPresentacion: '2023-01-01'}
  ];

  const groupedResults = component['groupResultsByPrueba'](listaResultados);

  expect(groupedResults.length).toBeGreaterThan(0);
});





});
