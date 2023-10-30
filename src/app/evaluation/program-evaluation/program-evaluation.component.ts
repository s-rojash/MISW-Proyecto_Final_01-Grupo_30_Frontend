import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evaluation } from '../evaluation';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public translate: TranslateService,
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
      this.toastr.success();
    }
  }

  selectChangeHandler (event: any) {
    this.selectedtypeApplicant = event.target.value;
  }

  selectChangeHandler2 (event: any) {
    this.selectedtypeCategory = event.target.value;
  }

  ngOnInit() {
    this.programEForm = this.formBuilder.group({
      candidatos: [this.selectedtypeApplicant],
      tipopruebas: [this.selectedtypeCategory],
      fechaprueba: ["", [Validators.required]]
    });
  }

}
