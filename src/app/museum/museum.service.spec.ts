import { TestBed, async, inject } from '@angular/core/testing';
import { MuseumService } from './museum.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClientModule } from '@angular/common/http';

describe('MuseumService', () => {
  let service: MuseumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule],
        providers:[MuseumService]
        });
    //service = TestBed.inject(MuseumService);
  });

  it('should be created', inject([MuseumService], (service: MuseumService) => {
    expect(service).toBeTruthy();
  }));
});
