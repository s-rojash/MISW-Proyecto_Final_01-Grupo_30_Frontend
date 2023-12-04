import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {MatDialog } from '@angular/material/dialog';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { ProfileService } from 'src/app/profile/profile.service';
import { Profile } from 'src/app/profile/profile';
import { Project } from 'src/app/project/project';
import { ProjectService } from 'src/app/project/project.service';


@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  teamForm!: FormGroup;
  profiles: Profile[] = [];
  projects: Project[] = [];

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public toastr: ToastrService,
    public teamService: TeamService,
    public projectService :ProjectService,
    public profileService: ProfileService) { }

    createTeam(teamData: any): void {
      const team: any = {
        proyecto: { id: teamData.project }, 
        nombre: teamData.nombre,
        perfil: { id: teamData.profile }, 
        cantidad: teamData.qtyrecursos
      };
    
      console.log("el valor del equipo a crear es",team);
      this.teamService.createTeam(team).subscribe(response => {
        console.info("El equipo fue creado: ", team);
        this.toastr.success("Confirmación", "Equipo creado");
        this.teamForm.reset();
      });
    }


  ngOnInit():void {
    this.teamForm = this.formBuilder.group({
      project: ["", [Validators.required]], 
      nombre: ["", [Validators.required]],
      qtyrecursos: ["", [Validators.required]],
      profile: [this.profiles, [Validators.required]]
    });
    

     this.profileService.getProfile().subscribe(profiles => {
      this.profiles = profiles;
      console.log('Perfiles obtenidos:', this.profiles);
     });

     this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      console.log('Proyectos obtenidos:', this.projects);
     });



     
  }

}