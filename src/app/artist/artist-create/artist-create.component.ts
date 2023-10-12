import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html'
})
export class ArtistCreateComponent implements OnInit {

  artistForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
   private toastr: ToastrService, private artistService: ArtistService) { }

  createArtist(artist: Artist){
   this.artistService.createArtist(artist).subscribe(author=>{
   console.info("The artist was created: ", artist)
   this.toastr.success("Confirmation", "Artist created")
   this.artistForm.reset();
   });
 }

    cancelCreation(){
   this.artistForm.reset();
    }
 
  ngOnInit(): void {
      this.artistForm = this.formBuilder.group({
     name: ["", [Validators.required, Validators.minLength(2)]],
     birthplace: ["", [Validators.required, Validators.minLength(2)]],
     birthdate: ["", [Validators.required, Validators.minLength(10)]],
     image: ["", Validators.required]
   })
  }

}
