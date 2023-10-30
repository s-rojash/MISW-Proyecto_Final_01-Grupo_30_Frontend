/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamService } from './team.service';
import { HttpClientTestingModule  } from '@angular/common/http/testing';

describe('Service: Team', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [TeamService]
    });
  });

  it('should ...', inject([TeamService], (service: TeamService) => {
    expect(service).toBeTruthy();
  }));
});
