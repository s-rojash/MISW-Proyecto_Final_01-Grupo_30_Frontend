import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtistDetail } from 'src/app/artist/artist-detail';
import { ArtistService } from 'src/app/artist/artist.service';
import { Artworks } from '../artworks';
import { ArtworksService } from '../artworks.service';

@Component({
  selector: 'app-artwork-create',
  templateUrl: './artwork-create.component.html'
})
export class ArtworkCreateComponent implements OnInit {

  artworkForm!: FormGroup;
  artists: Array<ArtistDetail> = [];
  selectedArtist: string = "";
  selectedTypes: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private artworksService: ArtworksService,
    private artistService: ArtistService,
    private _router: Router
  ) { }

  createArtwork(artwork: Artworks){
    if(this.selectedArtist != ""){
      if(this.selectedTypes != ""){
        console.log(this.selectedTypes);
        this.artworksService.createArtwork(artwork, this.selectedArtist).subscribe(artworkp =>{
          console.info("The Artworks was created: ", artworkp)
          this.toastr.success("Confirmation", "Artworks created")
          this.artworkForm.reset();
        });
        setTimeout(() =>
        {
          this._router.navigateByUrl('/obras/list');
        }, 1000);
      }
      else{
        this.toastr.warning("Warning", "Select a type valid.");
      }
    }
    else{
      this.toastr.warning("Warning", "Select an artist valid.");
    }
  }

  cancelCreation(){
    this.artworkForm.reset();
  }

  getArtists():void{
    this.artistService.getArtists().subscribe((artists) =>
    {this.artists=artists;}
    );
  }

  selectChangeHandler (event: any) {
    this.selectedTypes = event.target.value;
  }

  selectChangeHandler2 (event2: any) {
    this.selectedArtist = event2.target.value;
  }

  ngOnInit() {
    this.artworkForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.maxLength(300)]],
      year: ["", [Validators.required, Validators.maxLength(4)]],
      type: [this.selectedTypes],
      mainImage: ["", Validators.maxLength(300)]
    });
    this.getArtists();
  }

}
