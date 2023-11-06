import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../evaluation';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { Evaluationlist } from '../evaluationlist';
import { EvaluationService } from '../evaluation.service';
import { Signupapplicant } from 'src/app/signup/signupapplicant';

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.css']
})
export class ListEvaluationComponent implements OnInit {

  translate2!: TranslateService;
  displayedColumns: string[] = ['ret','name', 'weight', 'symbol'];
  evaluations: Array<Evaluation> = [];
  dataSource: Array<Evaluation> = [];

  constructor(private toastr: ToastrService,
    public translate: TranslateService,
    private evaluationService: EvaluationService) {
      this.translate2 = translate;
  }

  getAllTests():void{
    this.evaluationService.getAllScheduleTests().subscribe({
      next: (evaluationsp) => {
        this.evaluations = evaluationsp;
      },
      error: (e) => {
        this.translate2.get('EVALUATION.ERRORLOADLISTTESTS').subscribe((res: string) => {
        this.toastr.error(res);
        });
      },
      complete: () => {
        this.dataSource = this.evaluations
      }
    });
  }

  ngOnInit() {
    this.getAllTests();
  }
}
