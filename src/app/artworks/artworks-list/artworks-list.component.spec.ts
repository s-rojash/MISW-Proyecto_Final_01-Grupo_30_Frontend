import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { HttpClientModule } from '@angular/common/http';
import { ArtworksService } from '../artworks.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ArtworksListComponent } from './artworks-list.component';
import { Artworks } from '../artworks';
import { ToastrModule } from 'ngx-toastr';
import { ArtworkDetail } from '../artwork-detail';

describe('ArtworksListComponent', () => {
  let component: ArtworksListComponent;
  let fixture: ComponentFixture<ArtworksListComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [ ArtworksListComponent ],
      providers: [ ArtworksService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworksListComponent);
    component = fixture.componentInstance;

    component.artworkss = [
      new ArtworkDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.image.imageUrl()
    )];

    component.artworkssForAdd = [
      new ArtworkDetail(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.image.imageUrl()
      )
    ];

    component.pageAddArtwork();

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an link element', () => {
    let el: HTMLElement;
    el = fixture.debugElement.nativeElement;
    const content = el.querySelector('a');

    expect(content?.textContent).toContain(
      component.artworkss[0].name
    );
  });

  it('should have an option element', () => {
    let select: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;

    expect(select.options[1].value).toBe(
      component.artworkssForAdd[0].id.toString()
    );
  });

  it('Debe tener un div detalle_obra', () => {
    expect(debug.query(By.css('div')).name.includes('artwork_details'));
  });

});
