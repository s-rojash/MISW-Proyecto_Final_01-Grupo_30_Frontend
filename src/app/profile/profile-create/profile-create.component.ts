import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import {MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.css']
})
export class ProfileCreateComponent implements OnInit {

  profileForm!: FormGroup;
  valueNames = '';

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private profileService: ProfileService) { }

  createProfile (profile: Profile):void{
    this.profileService.createProfile(profile).subscribe(author=>{
          console.info("The profile was created: ", profile) 
          this.toastr.success("Confirmation", "profile created")
            this.profileForm.reset();
            
    });
  }

  ngOnInit():void {
    this.profileForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
     });

  }

}
