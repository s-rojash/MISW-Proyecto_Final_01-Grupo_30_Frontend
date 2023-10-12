import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';
import { MuseumDetailComponent } from '../museum-detail/museum-detail.component';
import { Museum } from '../museum';
import { MuseumDetail } from '../museum-detail';
import { HttpClientModule } from '@angular/common/http';
import { MuseumService } from '../museum.service';
import { Exhibitions } from "../../exhibitions/exhibitions"
import { Sponsor } from "../../sponsor/sponsor";
import { RouterTestingModule } from '@angular/router/testing';

describe('MuseumListComponent', () => {
  let component: MuseumDetailComponent;
  let fixture: ComponentFixture<MuseumDetailComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientModule, RouterTestingModule],
        declarations: [ MuseumDetailComponent ],
        providers: [ MuseumService ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumDetailComponent);
    component = fixture.componentInstance;

    let sponsor = new Sponsor(
      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.internet.url()
    );

    let exhibitions: Exhibitions;

    exhibitions = new Exhibitions(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        sponsor,
        []
      );

    let exhibitions2 = new Exhibitions(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        sponsor,
        []
      );

    let array_prueba = [exhibitions,exhibitions2];

    component.museumDetail= new MuseumDetail(
            faker.datatype.number(),
            faker.name.findName(),
            faker.lorem.sentence(),
            faker.address.streetAddress(),
            faker.address.city(),
            faker.image.imageUrl(),
            array_prueba
        );



    fixture.detectChanges();
    debug = fixture.debugElement;
  });

 it('should create', () => {
    expect(component).toBeTruthy();
    debug = fixture.debugElement;
  });
  it('Debe tener una imagen ', () => {
   expect(debug.query(By.css('img')).attributes['alt']).toEqual(
     component.museumDetail.name
   );
 });

 it('Debe tener un div detalle_museo', () => {
   //expect(debug.query(By.css('div')).attributes['class']).toEqual('card-body');
  expect(debug.query(By.css('div')).name.includes('museum_details'));
    });

});
