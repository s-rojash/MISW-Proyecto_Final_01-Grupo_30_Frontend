import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendaPruebaService } from 'src/app/agendapruebas/agenda-prueba.service';
import { Prueba } from 'src/app/banco-preguntas/prueba';
import { BancoPreguntasService } from 'src/app/banco-preguntas/banco-preguntas.service';
import { Candidato } from '../candidato';
import { ProjectService } from 'src/app/project/project.service';
import { TeamService } from 'src/app/team/team.service';
import { Team } from 'src/app/team/team';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project/project';
import { EvaluacionDesempenoService } from '../evaluacion-desempeno.service';

@Component({
  selector: 'app-evaluacion-desempeno-create',
  templateUrl: './evaluacion-desempeno-create.component.html',
  styleUrls: ['./evaluacion-desempeno-create.component.css']
})
export class EvaluacionDesempenoCreateComponent implements OnInit {

  teamForm!: FormGroup;
  listaPruebas!: Prueba[];
  listaCandidatos!: Candidato[];
  private routeSub: Subscription | undefined;
  private equipoId!: number | null;
  teams: Team[] = [];
  projects: Project[] = [];


  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private agendaPruebaService: AgendaPruebaService,
    private bancoPreguntasService: BancoPreguntasService,
    private teamService: TeamService,
    private projectService: ProjectService,
    private evaluacionDesempenoService: EvaluacionDesempenoService,
    private route: ActivatedRoute,
    private router: Router) { }

    getListaPruebas(): void {
      this.bancoPreguntasService.getListaPruebas().subscribe((listaPruebas) => {
        this.listaPruebas = listaPruebas;
      });
    }

    getListaCandidatosEquipo(): void {
      this.agendaPruebaService.getListaCandidatos().subscribe((listaCandidatos: Candidato[]) => {
        this.listaCandidatos = listaCandidatos;
      });
    }

    ngOnInit():void {
      this.teamService.getTeams().subscribe((teams: Team[]) => {
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
        // Si no se selecciona ningún proyecto, borra la lista de equipos
        this.teams = [];
      }
    }
  }
  onTeamSelectionChange() {
    const selectedTeamControl = this.teamForm.get('team');
    if (selectedTeamControl) {
      const selectedTeamId = selectedTeamControl.value;
        this.evaluacionDesempenoService.getListaCandidatos().subscribe((listaCandidatos: Candidato[]) => {
          this.listaCandidatos = listaCandidatos;
        });
    }
  }

  onCandidateSelectionChange(){

  }
}
