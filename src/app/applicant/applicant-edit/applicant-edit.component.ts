import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Signupapplicant } from '../../../app/signup/signupapplicant';
import { ApplicantService } from '../applicant.service';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/signup/signup.service';
import { Login } from '../../../app/login/login';
import { LoginService } from 'src/app/login/login.service';
import { Applicant } from '../applicant';

@Component({
  selector: 'app-applicant-edit',
  templateUrl: './applicant-edit.component.html',
  styleUrls: ['./applicant-edit.component.css']
})
export class ApplicantEditComponent implements OnInit {

  applicantRForm!: FormGroup;
  selectedtypeNIT: string = "C.C.";
  valueEmail = '';
  valueNames = '';
  valuelastNames = '';
  valuelastNI = '';
  valuePhone = '';
  valuePassword = '';

  constructor(private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    private signupService: SignupService,
    private loginService:LoginService,
    private toastr: ToastrService) { }

  editApplicant(applicant: Applicant):void{
    this.applicantService.updateApplicant(applicant).subscribe(applicantp=>{
      console.info("The applicant was updated: ", applicantp);
      this.toastr.success("Se modifico correctamente.");
    },
    error=>{
    });
  }

  getApplicant(){
    this.applicantService.getApplicant().subscribe({
      next: (applicantp) => {
        this.applicantRForm.patchValue({
          id: applicantp.id,
          nombres: applicantp.nombres,
          apellidos: applicantp.apellidos,
          tipoDocumento: applicantp.tipoDocumento,
          numDocumento: applicantp.numDocumento,
          celular: applicantp.celular,
          email: applicantp.email,
          password: applicantp.password,
          token: applicantp.token,
          expireAt: applicantp.expireAt,
          createdAt: applicantp.createdAt
        });
      },
      error: () => {
        this.toastr.error("No se pudo obtener su informacion de perfil.");
      }
    });
  }

  selectChangeHandler (event: any) {
    this.selectedtypeNIT = event.target.value;
  }

  ngOnInit() {
    this.applicantRForm = this.formBuilder.group({
      id: [null],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      tipoDocumento: [this.selectedtypeNIT],
      numDocumento: ["", [Validators.required]],
      celular: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      token: [null],
      expireAt: [null],
      createdAt: [null]
    });
    this.getApplicant();
  }

}
