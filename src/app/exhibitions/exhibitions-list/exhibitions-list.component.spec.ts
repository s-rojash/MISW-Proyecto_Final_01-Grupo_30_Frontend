import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { ExhibitionsListComponent } from './exhibitions-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ExhibitionsService } from '../exhibitions.service';
import { Exhibitions } from '../exhibitions';
import { RouterTestingModule } from '@angular/router/testing';
import { Sponsor } from 'src/app/sponsor/sponsor';

describe('ExhibitionsListComponent', () => {
  let component: ExhibitionsListComponent;
  let fixture: ComponentFixture<ExhibitionsListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ ExhibitionsListComponent ],
      providers: [ ExhibitionsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionsListComponent);
    component = fixture.componentInstance;

    let sponsor = new Sponsor(
      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.internet.url()
    );

    component.exhibitions = [
      new Exhibitions(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        sponsor,
        []
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
      component.exhibitions[0].name
    );
  });

 });
