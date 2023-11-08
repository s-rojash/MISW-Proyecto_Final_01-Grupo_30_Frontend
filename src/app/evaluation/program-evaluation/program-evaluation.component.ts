import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evaluation } from '../evaluation';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { Signupapplicant } from '../../signup/signupapplicant';
import { EvaluationService } from '../evaluation.service';
import { Evaluationtest } from '../evaluationtest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-evaluation',
  templateUrl: './program-evaluation.component.html',
  styleUrls: ['./program-evaluation.component.css']
})
export class ProgramEvaluationComponent implements OnInit {

  programEForm!: FormGroup;
  selectedtypeApplicant: string = "0";
  selectedtypeCategory: string = "0";
  translate2!: TranslateService;
  applicantsForAdd: Array<Signupapplicant> = [];
  testsForAdd: Array<Evaluationtest> = [];

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public translate: TranslateService,
    private evaluationService: EvaluationService,
    private router: Router
    ) {
      this.translate2 = translate;
     }

  programEvaluation(evalution: Evaluation):void{
    if(this.selectedtypeApplicant === "0" || this.selectedtypeCategory === "0"){
      if(this.selectedtypeApplicant === "0"){
        this.translate2.get('EVALUATION.INVALIDAPPLICANT').subscribe((res: string) => {
          this.toastr.error(res);
        });
        return;
      }

      if(this.selectedtypeCategory === "0"){
        this.translate2.get('EVALUATION.INVALIDBANK').subscribe((res: string) => {
          this.toastr.error(res);
        });
        return;
      }
    }
    else{
      this.evaluationService.createScheduleTest(evalution).subscribe({
        next: (evalutionp) => {
          console.info("The company was created: ", evalutionp)

          this.translate2.get('EVALUATION.SUCCESSSCHEDULE').subscribe((res: string) => {
            this.toastr.success(res);
          });
          this.programEForm.reset();
          this.router.navigate(['/evaluation/list']);
        },
        error: (e) => {
          this.translate2.get('EVALUATION.SCHEDULEFAILED').subscribe((res: string) => {
            this.toastr.error(res);
          });
          this.programEForm.reset();
        }
      });
    }
  }

  getApplicantsForAdd(): void {
    this.evaluationService.getApplicants().subscribe({
      next: (applicants) => {
        this.applicantsForAdd = applicants
      },
      error: (e) => {
        this.translate2.get('EVALUATION.ERRORLOADLISTAPPLICANTS').subscribe((res: string) => {
        this.toastr.error(res);
        });
      }
    });
  }

  getAllTestsForAdd():void{
    this.evaluationService.getTests().subscribe({
      next: (tests) => {
        this.testsForAdd = tests
      },
      error: (e) => {
        this.translate2.get('EVALUATION.ERRORLOADLISTTESTS').subscribe((res: string) => {
        this.toastr.error(res);
        });
      }
    });
  }

  selectChangeHandler (event: any) {
    this.selectedtypeApplicant = event.target.value;
  }

  selectChangeHandler2 (event: any) {
    this.selectedtypeCategory = event.target.value;
  }

  ngOnInit() {
    this.programEForm = this.formBuilder.group({
      idCandidato: [this.selectedtypeApplicant],
      prueba: this.formBuilder.group({
        id: [this.selectedtypeCategory]
      }),
      fecha: ["", [Validators.required]],
      puntos: 0,
      estado: "pendiente"
    });
    this.getApplicantsForAdd();
    this.getAllTestsForAdd();
  }

}
