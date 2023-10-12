/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { SponsorListComponent } from './sponsor-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SponsorService } from '../sponsor.service';
import { Sponsor } from '../sponsor';
import { RouterTestingModule } from '@angular/router/testing';
import { Exhibitions } from 'src/app/exhibitions/exhibitions';

describe('SponsorListComponent', () => {
  let component: SponsorListComponent;
  let fixture: ComponentFixture<SponsorListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ SponsorListComponent ],
      providers: [ SponsorService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorListComponent);
    component = fixture.componentInstance;

    component.sponsors = [
      new Sponsor(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence()
      ),
    ];
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an link element ', () => {
    let el: HTMLElement;
    el = fixture.debugElement.nativeElement;
    const content = el.querySelector('a');

    expect(content?.textContent).toContain(
      component.sponsors[0].name
    );
  });

 });
