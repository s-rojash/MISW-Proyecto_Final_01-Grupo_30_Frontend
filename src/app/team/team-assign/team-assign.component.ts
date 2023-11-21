import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SignupService } from 'src/app/signup/signup.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';
import { Team } from '../team';
import { TeamService } from '../team.service';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TeamAssign } from '../team-assign';

class DataCandidato{
  id:number;
  idcandidato:number;
  candidato: string;
  especialidad: string;

  constructor(id:number,
    idcandidato:number,
    candidato: string,
    especialidad: string){
      this.id = id;
      this.idcandidato = idcandidato;
      this.candidato = candidato;
      this.especialidad = especialidad;
  }
}

@Component({
  selector: 'app-team-assign',
  templateUrl: './team-assign.component.html',
  styleUrls: ['./team-assign.component.css']
})
export class TeamAssignComponent implements OnInit {

  @Input() team!: Team;

  displayedColumns: string[] = ['idCandidato', 'Candidato', 'Especialidad','Boton'];
  dataSource: DataCandidato[] = [];
  dataSourceSave: DataCandidato[] = [];
  applicants: Array<Signupapplicant> = [];
  selectedApplicant: any;
  validatelenght: boolean = false;
  translate2!: TranslateService;
  teamsAssign: TeamAssign[] = [];

  @ViewChild(MatTable) table!: MatTable<[]>;

  constructor(private signupService: SignupService,
              private teamService: TeamService,
              public translate: TranslateService,
              private toastr: ToastrService) {
                this.translate2 = translate;
  }

  getApplicants():void{
    this.signupService.getApplicant().subscribe((applicantp) =>{
      this.applicants=applicantp;
      this.getApplicantsAssigns();
    }
    );
  }

  addApplicantToTable(){
    if(this.selectedApplicant){
      let lastidselected = this.dataSource.find(item => item.idcandidato === this.selectedApplicant.id);

      if(!lastidselected){
        this.dataSource.push({id: 0, idcandidato: this.selectedApplicant.id, candidato: this.selectedApplicant.nombres + " " + this.selectedApplicant.apellidos, especialidad: this.team.perfil.nombre});
        this.table.renderRows();
      }
    }

    if(this.dataSource.length > 0){
      this.validatelenght = true;
    }
  }

  assignApplicants(){
    for(const element of this.dataSource){
      const teamAssign:TeamAssign = {id: 0, equipo: this.team, idCandidato: element.idcandidato};
      let teamVerify = this.dataSourceSave.find(item => item.idcandidato === element.idcandidato);

      if(!teamVerify){
        this.teamService.createAssignTeam(teamAssign).subscribe(teamassignp=>{
          console.info("The team assign was created: ", teamassignp);
        });
      }
    }

    for(const element of this.dataSourceSave){
      let teamVerify = this.dataSource.find(item => item.idcandidato === element.idcandidato);

      if(!teamVerify){
        this.teamService.deleteAssignTeam(element.id).subscribe(
        );
      }
    }
    this.translate2.get('TEAM.SUCCESSASSIGNAPPLICANTS').subscribe((res: string) => {
      this.toastr.success(res);
    });
    this.getApplicants();
  }

  getApplicantsAssigns(){
    this.teamService.getAllAssignTeam().subscribe(teamsAssignp => {
      this.teamsAssign = teamsAssignp;
      this.dataSource = [];
      this.dataSourceSave = [];
      console.log(this.team.id);

      for(const element of this.teamsAssign){
        let applicant = this.applicants.find(item => item.id === element.idCandidato);

        if(element.equipo.id === this.team.id){
          if(applicant){
            this.dataSource.push({id: element.id, idcandidato: element.idCandidato, candidato: applicant.nombres + " " + applicant.apellidos, especialidad: element.equipo.perfil.nombre});
            this.dataSourceSave.push({id: element.id, idcandidato: element.idCandidato, candidato: applicant.nombres + " " + applicant.apellidos, especialidad: element.equipo.perfil.nombre});
          }
        }
      }
      this.table.renderRows();
    });
  }

  deleteRow(row:any){
    const index = this.dataSource.findIndex(item => item.idcandidato === row.idcandidato);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
    }
    this.table.renderRows();
    console.log(row);

    if(this.dataSource.length > 0){
      this.validatelenght = true;
    }
  }

  deleteRecord(row:any){
    if(this.dataSourceSave.length === 0){
      this.deleteRow(row);
    }
    else if(this.dataSource.length > 1){
      this.deleteRow(row);
    }
    else{
      this.translate2.get('TEAM.ERRORDELETEAPPLICANTS').subscribe((res: string) => {
        this.toastr.error(res);
      });
    }
  }

  ngOnInit() {
    this.getApplicants();
    console.log(this.dataSource);
  }
}
