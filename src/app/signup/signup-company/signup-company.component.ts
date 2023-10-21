import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogalertopcompComponent } from '../dialogalertopcomp/dialogalertopcomp.component';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.css']
})
export class SignupCompanyComponent implements OnInit {

  companyRForm!: FormGroup;
  selectedtypeLogin: string = "";
  valueEmail = '';
  valueNames = '';
  valuelastNames = '';
  valuelastNI = '';
  valuelastDV = '';

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  registerCompany(){
    //Enviar 1 si la operacion fue exitosa y 2 si no tuvo exito
    this.openDialog('1');
  }

  openDialog(resultprocess: string) {
    const dialogRef = this.dialog.open(DialogalertopcompComponent, {
      disableClose: true
    });
    dialogRef.componentInstance.iddialog = resultprocess;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log("funciono");
  }

  selectChangeHandler (event: any) {
    this.selectedtypeLogin = event.target.value;
  }

  ngOnInit() {
    this.selectedtypeLogin = "0";
    this.companyRForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      names: ["", [Validators.required]],
      lastnames: ["", [Validators.required]],
      ni: ["", [Validators.required]],
      dv: ["", [Validators.required]],
      typeLogin: this.formBuilder.group({
        id: [this.selectedtypeLogin]
      })
    });
  }

}
