/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SignupApplicantComponent } from './signup-applicant.component';

describe('SignupApplicantComponent', () => {
  let component: SignupApplicantComponent;
  let fixture: ComponentFixture<SignupApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
