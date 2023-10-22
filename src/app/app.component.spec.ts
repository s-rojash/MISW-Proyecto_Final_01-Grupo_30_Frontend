import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtworksListComponent } from './artworks/artworks-list/artworks-list.component';
import { MuseumListComponent } from 'src/app/museum/museum-list/museum-list.component'
import { ArtistListComponent } from 'src/app/artist/artist-list/artist-list.component'
import { ExhibitionsListComponent } from 'src/app/exhibitions/exhibitions-list/exhibitions-list.component';
import { SponsorListComponent } from 'src/app/sponsor/sponsor-list/sponsor-list.component';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule
      ],
      declarations: [
        AppComponent, MuseumListComponent, ArtistListComponent, SponsorListComponent, ExhibitionsListComponent, ArtworksListComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontabc-front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontabc-front');
  });

});
