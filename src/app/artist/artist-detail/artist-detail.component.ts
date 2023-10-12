import { Component, Input, OnInit } from '@angular/core';
//import { Artist } from '../artist'
import { ArtistDetail } from '../artist-detail'

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html'
})
export class ArtistDetailComponent implements OnInit {

   //@Input() artistDetail!: Artist;
  @Input() artistDetail!: ArtistDetail;
  
  constructor() { }

   
  ngOnInit(): void {
  }

}
