/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArtworksService } from './artworks.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('ArtworksService', () => {
  let service: ArtworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArtworksService]
    });
  });


  it('should be created', inject([ArtworksService], (service: ArtworksService) => {
    expect(service).toBeTruthy();
  }));
});
