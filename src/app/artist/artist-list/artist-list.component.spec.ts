import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';
//import { ArtistListComponent } from './artist-list.component';
import { Artist } from '../artist';
import { Movement } from 'src/app/movement/movement';
import { HttpClientModule } from '@angular/common/http';
import { ArtistService } from '../artist.service';
import { ArtistDetailComponent } from '../artist-detail/artist-detail.component';
import { ArtistDetail } from '../artist-detail';
import { RouterTestingModule } from '@angular/router/testing';

describe('ArtistListComponent', () => {
  let component: ArtistDetailComponent;
  let fixture: ComponentFixture<ArtistDetailComponent>;
  let debug: DebugElement;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
       imports: [HttpClientModule, RouterTestingModule],  
      declarations: [ ArtistDetailComponent ],
       providers: [ ArtistService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetailComponent);
    component = fixture.componentInstance;
    
    let movement = new Movement(
         faker.name.findName(),
         faker.lorem.sentence(),
         faker.address.country(),
         faker.datatype.number().toString()
    );
    let movement2 = new Movement(
         faker.name.findName(),
         faker.lorem.sentence(),
         faker.address.country(),
         faker.datatype.number().toString()
    );
    
    let array_movement = [movement, movement];
    
    //component.artists=[
        //new Artist(
    component.artistDetail = new ArtistDetail(
            faker.datatype.number(),
            faker.name.findName(),
            faker.address.city(),
            faker.date.past().toString(),
            faker.image.imageUrl(),
            array_movement
        );
        
    
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
 /*it("Debe tener una tabla", () => {
   expect(debug.query(By.css("tbody")).childNodes.length).toBeGreaterThan(0);
 });*/

 it('Debe tener una imagen ', () => {
   expect(debug.query(By.css('img')).attributes['alt']).toEqual(
     component.artistDetail.name
   );
 });
  
  it('Debe tener un div detalle_artista', () => {
   //expect(debug.query(By.css('div')).attributes['class']).toEqual('card-body');
  expect(debug.query(By.css('div')).name.includes('artist_details'));
    });

});

