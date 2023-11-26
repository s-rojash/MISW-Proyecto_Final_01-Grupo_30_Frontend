import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card'; // Importa el módulo de Angular Material para mat-card

import { ResultadosListComponent } from './resultados-list.component';
import { ResultadosService } from '../resultados.service';

describe('ResultadosListComponent', () => {
  let component: ResultadosListComponent;
  let fixture: ComponentFixture<ResultadosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosListComponent ],
      imports: [ HttpClientTestingModule, MatCardModule ], // Agrega MatCardModule a los imports
      providers: [ ResultadosService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
