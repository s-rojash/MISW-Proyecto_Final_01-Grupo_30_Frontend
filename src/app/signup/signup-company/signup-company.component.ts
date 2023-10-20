import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  registerCompany(){}

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
