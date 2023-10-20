import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  selectChangeHandler (event: any) {
    this.selectedtypeLogin = event.target.value;
  }

  registerApplicant(){}

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
