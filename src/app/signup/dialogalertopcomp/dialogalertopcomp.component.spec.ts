/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogalertopcompComponent } from './dialogalertopcomp.component';

describe('DialogalertopcompComponent', () => {
  let component: DialogalertopcompComponent;
  let fixture: ComponentFixture<DialogalertopcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogalertopcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogalertopcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
