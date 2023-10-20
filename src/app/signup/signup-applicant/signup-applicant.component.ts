import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogalertopappliComponent } from '../dialogalertopappli/dialogalertopappli.component';

@Component({
  selector: 'app-signup-applicant',
  templateUrl: './signup-applicant.component.html',
  styleUrls: ['./signup-applicant.component.css']
})
export class SignupApplicantComponent implements OnInit {

  applicantRForm!: FormGroup;
  selectedtypeLogin: string = "";
  valueEmail = '';
  valueNames = '';
  valuelastNames = '';
  valuelastNI = '';
  valuePhone = '';

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  selectChangeHandler (event: any) {
    this.selectedtypeLogin = event.target.value;
  }

  registerApplicant(){
    //Enviar 1 si la operacion fue exitosa y 2 si no tuvo exito
    this.openDialog('1');
  }

  openDialog(resultprocess: string) {
    const dialogRef = this.dialog.open(DialogalertopappliComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.iddialog = resultprocess;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log("funciono");
  }

  ngOnInit() {
    this.selectedtypeLogin = "0";
    this.applicantRForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      names: ["", [Validators.required]],
      lastnames: ["", [Validators.required]],
      ni: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      typeLogin: this.formBuilder.group({
        id: [this.selectedtypeLogin]
      })
    });
  }

}
