import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogtypesignupComponent } from '../dialogtypesignup/dialogtypesignup.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit  {

  loginForm!: FormGroup;
  selectedtypeLogin: string = "";
  translate2!: TranslateService;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    this.translatelang(translate);
    this.translate2 = translate;
  }

  changeLang(pref: string){
    localStorage.setItem("lang", pref);
    this.translatelang(this.translate2);
  }

  translatelang(translate: TranslateService){
    if(localStorage.getItem("lang") === undefined){
      translate.setDefaultLang('en');
    }
    else if(localStorage.getItem("lang") === 'es'){
      translate.setDefaultLang('es');
    }
    else if(localStorage.getItem("lang") === 'en'){
      translate.setDefaultLang('en');
    }
  }

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
