/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DialogalertopappliComponent } from './dialogalertopappli.component';

describe('DialogalertopappliComponent', () => {
  let component: DialogalertopappliComponent;
  let fixture: ComponentFixture<DialogalertopappliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogalertopappliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogalertopappliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
