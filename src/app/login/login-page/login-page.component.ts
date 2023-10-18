import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogtypesignupComponent } from '../dialogtypesignup/dialogtypesignup.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit  {

  loginForm!: FormGroup;
  selectedtypeLogin: string = "";

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  goToApp(){
    console.log(this.selectedtypeLogin);
  }

  goToSignUp(){}

  selectChangeHandler (event: any) {
    this.selectedtypeLogin = event.target.value;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogtypesignupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    console.log("funciono");
  }

  ngOnInit() {
    this.selectedtypeLogin = "0";
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      typeLogin: this.formBuilder.group({
        id: [this.selectedtypeLogin]
      })
    });
  }
}
