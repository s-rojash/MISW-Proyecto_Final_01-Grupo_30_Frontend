import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogalertopcompComponent } from '../dialogalertopcomp/dialogalertopcomp.component';
import { Signupcompany } from '../signupcompany';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.css']
})
export class SignupCompanyComponent implements OnInit {

  companyRForm!: FormGroup;
  selectedtypeNIT: string = "NIT";
  valueEmail = '';
  valueNames = '';
  valuelastNI = '';
  valuelastDV = '';
  valuePassword = '';

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private signupService: SignupService) { }

  registerCompany(signupcompany: Signupcompany):void{
    this.signupService.createCompany(signupcompany).subscribe(signupcompanyp=>{
      console.info("The company was created: ", signupcompanyp)
      this.openDialog('1');
      this.companyRForm.reset();
    },
    error=>{
      this.openDialog('2');
    });
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
    this.selectedtypeNIT = event.target.value;
  }

  ngOnInit() {
    this.companyRForm = this.formBuilder.group({
      razonSocial: ["", [Validators.required]],
      tipoDocumento: [this.selectedtypeNIT],
      numDocumento: ["", [Validators.required]],
      digitoVerificacion: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

}
