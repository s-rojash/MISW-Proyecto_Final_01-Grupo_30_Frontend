import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../evaluation';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { Message } from '../message';

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.css']
})
export class ListEvaluationComponent implements OnInit {

  translate2!: TranslateService;
  message: Message = { from: 'sdsds', subject: 'dfd', content:'sdfsdf' };
  message2: Message = { from: 'rrtrf', subject: 'rtrtr', content:'rtrt' };
  message3: Message = { from: 'ewew', subject: 'wewew', content:'wewew' };
  messages: Message[] = [this.message, this.message2, this.message3];
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = this.messages;

  constructor(private toastr: ToastrService,
    public translate: TranslateService) {
      this.translate2 = translate;
     }

  ngOnInit() {
  }

}
