import { Component, Input, OnInit } from '@angular/core';
import { ArtworkDetail } from '../artwork-detail';
import { ArtworksService } from '../artworks.service';
import { Router } from '@angular/router';
import { ArtworkComplete } from '../artwork-complete';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {

  artwork: Array<ArtworkComplete> = [];

  @Input() artworkDetail!: ArtworkDetail;

  constructor(
    private artworksService: ArtworksService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  getArtworkArtist(idArtwork: number) {
    this.artworksService.getArtworksComplete().subscribe((artwork) => {
      this.artwork = artwork;
      this.artwork.forEach(function(artworkp:any) {
        if (artworkp.id == idArtwork){
          var idArtist = artworkp.artist.id;
          var elemento = document.getElementById('idArtista');
          elemento!.setAttribute('value',String(idArtist));

        }
      })
    })
  }

  async addImageArtwork(){
    const newImage = (document.getElementById('newImageArtwork')) as HTMLInputElement;
    const urlNewImage = newImage.value;
    var idArtwork = this.artworkDetail.id;
    if (urlNewImage !== ""){
      this.getArtworkArtist(idArtwork);

      await delay(1000);

      var idValueArtist = document.getElementById('idArtista');
      var idArtist = idValueArtist?.getAttribute('value');

      console.log('hola');

      this.artworksService.addImageArtwork(idArtist!, idArtwork, urlNewImage).subscribe(artwork => {
        console.info("The artwork was associated", artwork);
        this.toastr.success("Confirmation", "Artworks created")
      })

    }else{
      this.toastr.warning("Warning", "URL invalid");
    }

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  }


  ngOnInit(): void {
  }

}
