import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArtworksService } from '../artworks.service';
import { ArtworkDetail } from '../artwork-detail';
import { Router } from '@angular/router';
import { MuseumDetail } from 'src/app/museum/museum-detail';

@Component({
  selector: 'app-artworks-list',
  templateUrl: './artworks-list.component.html',
  styleUrls: ['./artworks-list.component.css']
})
export class ArtworksListComponent implements OnInit {

  artworkss: Array<ArtworkDetail> = [];
  artworkssForAdd: Array<ArtworkDetail> = [];
  selectedArtwork!: ArtworkDetail;
  selected: boolean = false;
  addArt: boolean = false;
  artExhi: boolean = false;
  museums: Array<MuseumDetail> = [];
  nameExhibition: string = "";

  href: string = '';

  constructor(private artworksService: ArtworksService, private router: Router, private toastr: ToastrService ) { }

  getArtworks(): void {
    this.artworksService.getArtworks().subscribe((artworkss) => {
      this.artworkss = artworkss;
    });
  }

  getArtworksForAdd(): void {
    this.artworksService.getArtworks().subscribe((artworkss) => {
      this.artworkssForAdd = artworkss;
    });
  }

  getArtistArtworks(id: string): void {
    this.artworksService.getArtistArtworks(id).subscribe((artworkss) => {
      this.artworkss = artworkss;
    });
  }

  getExhibitionsArtworks(idExhibition: string): void {
    this.artworksService.getExhibitionsArtworks(idExhibition).subscribe((artworkss) => {
      this.artworkss = artworkss;
    });
  }

  getExhibitionInformation(idExhibition: string): void {
    this.artworksService.getMuseums().subscribe((museums) => {
      var name = "";
      this.museums = museums;
      this.museums.forEach(function(museum){
        museum.exhibitions.forEach(function(exhibition){
          if (String(exhibition.id) == idExhibition){
            name = exhibition.name;
          }
        });
      });
      this.nameExhibition = name;
    })
  }

  onSelected(artwork: ArtworkDetail) {
    this.selected = true;
    this.selectedArtwork = artwork;
  }

  pageAddArtwork() {
    this.addArt = true;
    this.getArtworksForAdd();
  }

  addArtwork() {
    const artworkSelected = (document.getElementById('addArtwork')) as HTMLSelectElement
    const idArtworkSelected = artworkSelected.value;
    const idExhibition = this.href.slice(15);
    if (idArtworkSelected != ""){
      this.artworksService.addArtworkExhibition(idArtworkSelected, idExhibition).subscribe(artwork => {
        console.info("The artwork was associated", artwork);
        this.toastr.success("Confirmation", "Artworks created")
      })
    }else{
      this.toastr.warning("Warning", "Select a artwork valid.")
    }
  }

  ngOnInit() {
    this.href = this.router.url;
    if (this.href == '/obras/list'){
      this.getArtworks();
    }
    else{
      if(this.href.includes('/obras/listExh')){
        console.log(this.href.slice(15));
        this.artExhi = true;
        this.getExhibitionInformation(this.href.slice(15));
        this.getExhibitionsArtworks(this.href.slice(15));
      }
      else{
        this.getArtistArtworks(this.href.slice(12));
      }
    }
  }

}
