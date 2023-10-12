
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { ExhibitionsDetailsComponent } from './exhibitions-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ExhibitionsService } from '../exhibitions.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ExhibitionsDetail } from '../exhibitions-detail';
import { Sponsor } from 'src/app/sponsor/sponsor';

describe('ExhibitionsDetailsComponent', () => {
  let component: ExhibitionsDetailsComponent;
  let fixture: ComponentFixture<ExhibitionsDetailsComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ ExhibitionsDetailsComponent ],
      providers: [ ExhibitionsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionsDetailsComponent);
    component = fixture.componentInstance;

    let sponsor = new Sponsor(
      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.internet.url()
    );

    component.exhibitionsDetail = new ExhibitionsDetail(
      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      sponsor,
      []
    );
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an div element ', () => {
    let el: HTMLElement;
    el = fixture.debugElement.nativeElement;
    const content = el.querySelector('p');

    expect(content?.textContent).toContain(
      component.exhibitionsDetail.description
    );
  });
});
