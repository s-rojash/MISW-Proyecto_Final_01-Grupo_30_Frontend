import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {MatDialog } from '@angular/material/dialog';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { ProfileService } from 'src/app/profile/profile.service';
import { Profile } from 'src/app/profile/profile';


@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  teamForm!: FormGroup;
  profiles: Profile[] = [];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private teamService: TeamService,
    private profileService: ProfileService) { }

    createTeam (team: Team):void{
      this.teamService.createTeam(team).subscribe(author=>{
            console.info("The Team was created: ", team) 
            this.toastr.success("Confirmation", "Team created")
              this.teamForm.reset();
      });
    }

    
  ngOnInit():void {
    this.teamForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
     });
    
     
     this.profileService.getProfile().subscribe(profiles => {
      this.profiles = profiles;
     });

  }

}
