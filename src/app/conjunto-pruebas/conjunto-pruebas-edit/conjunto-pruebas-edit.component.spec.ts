/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConjuntoPruebasEditComponent } from './conjunto-pruebas-edit.component';

describe('ConjuntoPruebasEditComponent', () => {
  let component: ConjuntoPruebasEditComponent;
  let fixture: ComponentFixture<ConjuntoPruebasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConjuntoPruebasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConjuntoPruebasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
