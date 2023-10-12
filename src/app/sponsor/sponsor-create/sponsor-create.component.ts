import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sponsor } from '../sponsor';
import { SponsorService } from '../sponsor.service';

@Component({
  selector: 'app-sponsor-create',
  templateUrl: './sponsor-create.component.html'
})
export class SponsorCreateComponent implements OnInit {

  sponsorForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private sponsorService: SponsorService,
    private _router: Router
  ) { }

  createSponsor(sponsor: Sponsor){
    this.sponsorService.createSponsor(sponsor).subscribe(sponsorp=>{
      console.info("The Sponsor was created: ", sponsorp)
      this.toastr.success("Confirmation", "Sponsor created")
      this.sponsorForm.reset();
    });
    setTimeout(() =>
    {
      this._router.navigateByUrl('/sponsors/list');
    }, 1000);
  }

  cancelCreation(){
    this.sponsorForm.reset();
  }

  ngOnInit() {
    this.sponsorForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.maxLength(300)]],
      website: ["", [Validators.required, Validators.maxLength(100)]]
    });
  }

}
