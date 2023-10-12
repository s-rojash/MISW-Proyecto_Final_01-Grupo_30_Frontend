import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sponsor } from 'src/app/sponsor/sponsor';
import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { Exhibitions } from '../exhibitions';
import { ExhibitionsService } from '../exhibitions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exhibitions-create',
  templateUrl: './exhibitions-create.component.html'
})
export class ExhibitionsCreateComponent implements OnInit {

  exhibitionForm!: FormGroup;
  sponsors: Array<Sponsor> = [];
  selectedSponsor: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private exhibitionsService: ExhibitionsService,
    private sponsorService: SponsorService,
    private _router: Router
  ) { }

  createExhibition(exhibition: Exhibitions){
    if(this.selectedSponsor != ""){
      this.exhibitionsService.createExhibition(exhibition).subscribe(exhibitionp=>{
        console.info("The Exhibition was created: ", exhibitionp)
        this.toastr.success("Confirmation", "Exhibition created")
        this.exhibitionForm.reset();
      });
      setTimeout(() =>
      {
        this._router.navigateByUrl('/exhibitions/list/' + environment.idMuseum);
      }, 1000);
    }
    else{
      this.toastr.warning("Warning", "Select a sponsor valid.");
    }
  }

  cancelCreation(){
    this.exhibitionForm.reset();
  }

  getSponsors(): void {
    this.sponsorService.getSponsors().subscribe((sponsors) => {
      sponsors.forEach(sponsor => {
        if(sponsor.exhibition == null){
          this.sponsors.push(sponsor);
        }
      });
    });
  }

  selectChangeHandler (event: any) {
    this.selectedSponsor = event.target.value;
  }

  ngOnInit() {
    this.exhibitionForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.maxLength(300)]],
      sponsor: this.formBuilder.group({
        id: [this.selectedSponsor]
      })
    });
    this.getSponsors();
  }

}
