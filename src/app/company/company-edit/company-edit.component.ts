import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Signupcompany } from 'src/app/signup/signupcompany';
import { SignupService } from 'src/app/signup/signup.service';
import { DialogalertopcompComponent } from 'src/app/signup/dialogalertopcomp/dialogalertopcomp.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  companyRForm!: FormGroup;
  signupcompany!: Signupcompany;
  selectedtypeNIT: string = "NIT";
  email = '';
  razonSocial = '';
  numDocumento: number = 0;
  valuelastDV: number = 0;
  valuePassword: string | null = '';

  constructor(private formBuilder: FormBuilder,    public dialog: MatDialog,  private companyService: CompanyService, private signupService: SignupService ) {}

  ngOnInit() {
    this.initForm();
    this.getCompany();

  }

  registerCompany(signupcompany: Signupcompany):void{

    this.companyService.createCompany(signupcompany).subscribe(signupcompanyp=>{
      console.info("The company was created: ", signupcompanyp)
      this.companyRForm.reset();
    },
    error=>{
    });



    this.companyService.createCompany(signupcompany).subscribe(signupcompanyp=>{
      console.info("The company was created: ", signupcompanyp)
      this.openDialog('3');
      this.companyRForm.reset();
    },
    error=>{
      this.openDialog('4');
    });
  }

  selectChangeHandler (event: any) {
    this.selectedtypeNIT = event.target.value;
  }


  getCompany(): void {
    this.companyService.getCompany().subscribe(
       (data) => {
         console.log(data);
         this.signupcompany = data;
         this.email = data.email;
         this.razonSocial = data.razonSocial;
         this.numDocumento = data.numDocumento;
         this.valuelastDV = data.digitoVerificacion;
         this.valuePassword = localStorage.getItem("PASS");
         this.companyRForm.get('tipoDocumento')?.setValue(data.tipoDocumento);
         this.companyRForm.get('id')?.setValue(data.id);
       },
       (error) => {

       }
    );
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


  initForm() {
    this.companyRForm = this.formBuilder.group({
       id: [null],
       razonSocial: [null, Validators.required],
       tipoDocumento: [null, Validators.required],
       numDocumento: [null, Validators.required],
       digitoVerificacion: [null, Validators.required],
       email: [null, [Validators.required, Validators.email]],
       password: [null, Validators.required]
    });
  }
}
