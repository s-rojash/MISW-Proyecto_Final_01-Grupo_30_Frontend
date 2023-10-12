import { Component, OnInit } from '@angular/core';
import { ArtistDetail } from '../artist-detail';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html'
})
export class ArtistListComponent implements OnInit {

  /*artists:Array<Artist>=[];
  selectedArtist!: Artist;
  selected: Boolean= false;*/
  artists: Array<ArtistDetail> = [];
  selectedArtist!: ArtistDetail;
  selected: boolean= false;
   
  constructor(private artistService:ArtistService) { }

  getArtists():void{
      this.artistService.getArtists().subscribe((artists) => 
      {this.artists=artists;}
      );
  }
  
   /*onSelected(artist: Artist)
    {
        this.selected=true;
        this.selectedArtist = artist;
    }*/
    onSelected(artist: ArtistDetail)
    {
        this.selected=true;
        this.selectedArtist = artist;
    }
  ngOnInit(): void {
      this.getArtists();
  }

}
