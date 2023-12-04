import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantService } from '../applicant.service';
import { ToastrService } from 'ngx-toastr';
import { Applicant } from '../applicant';
import { MatDialog } from '@angular/material/dialog';
import { DialogalertopappliComponent } from '../../signup/dialogalertopappli/dialogalertopappli.component';
import { TranslateService } from '@ngx-translate/core';

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
  translate2!: TranslateService;

  constructor(private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public translate: TranslateService) {
      this.translate2 = translate;
    }

  editApplicant(applicant: Applicant):void{
    this.applicantService.updateApplicant(applicant).subscribe({
      next: (applicantp) => {
        console.info("The applicant was updated: ", applicantp);
        this.openDialog('3');
      },
      error: () => {
        this.openDialog('4');
      }
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
          password: localStorage.getItem("PASS"),
          token: applicantp.token,
          expireAt: applicantp.expireAt,
          createdAt: applicantp.createdAt
        });
      },
      error: () => {
        this.translate2.get('HEADER.PROFILEGETERROR').subscribe((res: string) => {
          this.toastr.error(res);
        });
      }
    });
  }

  selectChangeHandler (event: any) {
    this.selectedtypeNIT = event.target.value;
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
