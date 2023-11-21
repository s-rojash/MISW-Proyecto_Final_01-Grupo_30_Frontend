// team-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { Project } from 'src/app/project/project';
import { ProjectService } from 'src/app/project/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teamForm!: FormGroup;
  teamDetails: any = null;
  teams: Team[] = [];
  projects: Project[] = [];
  isEditing = false;
  

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private teamService: TeamService,
    private projectService :ProjectService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      console.log('Proyectos obtenidos:', this.projects);
     });
  
     this.teamForm = this.formBuilder.group({
      project: [null, Validators.required], 
      team: [null, Validators.required] ,
      profile: [null], 
      cantidad: [null], 
    });
     
    this.onProjectSelectionChange();
     
  }

  onTeamSelectionChange() {
    const selectedTeamControl = this.teamForm.get('team');
    if (selectedTeamControl) {
      const selectedTeamId = selectedTeamControl.value;
    
        this.teamService.getTeamsById(selectedTeamId).subscribe((teamData) => {
      
        });

    }
  }
  


  onProjectSelectionChange() {
    const selectedProjectControl = this.teamForm.get('project');
    console.log("selectedProjectControl",selectedProjectControl);
    if (selectedProjectControl) {
      const selectedProjectId = selectedProjectControl.value;
      console.log("selectedProjectId",selectedProjectId);
      if (selectedProjectId) {
         this.teamService.getTeamsByProject(selectedProjectId).subscribe(teams => {
          this.teams = teams;
          console.log("teams",teams);
        });
      } else {

        this.teams = [];
      }
    }
  }


  
  
  
}