import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { DialogtypesignupComponent } from '../dialogtypesignup/dialogtypesignup.component';
import {TranslateService} from '@ngx-translate/core';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit  {

  loginForm!: FormGroup;
  selectedtypeLogin: string = "0";
  translate2!: TranslateService;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public translate: TranslateService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
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

  goToApp(login: Login):void{
    console.log(this.selectedtypeLogin);

    if(this.selectedtypeLogin === "0"){
      console.log("empresa");

      this.loginService.loginCompany(login).subscribe(loginp=>{
        console.info("The login was success: ", loginp)

        this.translate2.get('LOGIN.LOGINSUCCESS').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.loginForm.reset();
        this.router.navigate(['/principal']);
      },
      error=>{
        this.translate2.get('LOGIN.INVALIDCREDENTIALS').subscribe((res: string) => {
          this.toastr.error(res);
        });
      });
    }
    else{
      console.log("candidato");

      this.loginService.loginApplicant(login).subscribe(loginp=>{
        console.info("The login was success: ", loginp)

        this.translate2.get('LOGIN.LOGINSUCCESS').subscribe((res: string) => {
          this.toastr.success(res);
        });
        this.loginForm.reset();
        this.router.navigate(['/principal']);
      },
      error=>{
        this.translate2.get('LOGIN.INVALIDCREDENTIALS').subscribe((res: string) => {
          this.toastr.error(res);
        });
      });
    }
  }

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
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
}
