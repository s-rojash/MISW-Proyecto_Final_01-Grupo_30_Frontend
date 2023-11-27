import { Component, OnInit } from '@angular/core';
import { PrincipalService } from '../principal.service';
import { CandidatoHabilidades } from '../candidato-habilidades';
import { MatDialog } from '@angular/material/dialog';
import { DialogapplicantskillsComponent } from '../dialogapplicantskills/dialogapplicantskills.component';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.css']
})
export class PrincipalPageComponent implements OnInit {

  applicantSkills : Array<CandidatoHabilidades> = [];

  constructor(private principalService: PrincipalService,
              public dialog: MatDialog) {
  }

  getApplicantSkills():void{
    this.principalService.getApplicantSkills().subscribe((applicantskillsp)=> {
      this.applicantSkills = applicantskillsp;

      if(this.applicantSkills.length == 0){
        console.log("entro skills");
        this.openDialog();
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogapplicantskillsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log("funciono");
  }

  ngOnInit() {
    if(localStorage.getItem("API_CANDIDATO_ID") != null){
      this.getApplicantSkills();
    }
  }

}
