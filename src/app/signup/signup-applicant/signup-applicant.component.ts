import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogalertopappliComponent } from '../dialogalertopappli/dialogalertopappli.component';
import { Signupapplicant } from '../signupapplicant';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup-applicant',
  templateUrl: './signup-applicant.component.html',
  styleUrls: ['./signup-applicant.component.css']
})
export class SignupApplicantComponent implements OnInit {

  applicantRForm!: FormGroup;
  selectedtypeNIT: string = "C.C.";
  valueEmail = '';
  valueNames = '';
  valuelastNames = '';
  valuelastNI = '';
  valuePhone = '';
  valuePassword = '';

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private signupService: SignupService) {
    }

  selectChangeHandler (event: any) {
    this.selectedtypeNIT = event.target.value;
  }

  registerApplicant(signupapplicant: Signupapplicant):void{
    this.signupService.createApplicant(signupapplicant).subscribe(signupapplicantp=>{
      console.info("The applicant was created: ", signupapplicantp)
      this.openDialog('1');
      this.applicantRForm.reset();
    },
    error=>{
      this.openDialog('2');
    });
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
    this.applicantRForm = this.formBuilder.group({
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      tipoDocumento: [this.selectedtypeNIT],
      numDocumento: ["", [Validators.required]],
      celular: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

}
