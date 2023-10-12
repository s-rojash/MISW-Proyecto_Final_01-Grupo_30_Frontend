/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { SponsorDetailsComponent } from './sponsor-details.component';
import { SponsorService } from '../sponsor.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SponsorDetail } from '../sponsor-detail';

describe('SponsorDetailsComponent', () => {
  let component: SponsorDetailsComponent;
  let fixture: ComponentFixture<SponsorDetailsComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ SponsorDetailsComponent ],
      providers: [ SponsorService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDetailsComponent);
    component = fixture.componentInstance;

    component.sponsorDetail = new SponsorDetail(
      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence()
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an div element ', () => {
    let el: HTMLElement;
    el = fixture.debugElement.nativeElement;
    const content = el.querySelector('div');

    expect(content?.textContent).toContain(
      component.sponsorDetail.description
    );
  });
});
