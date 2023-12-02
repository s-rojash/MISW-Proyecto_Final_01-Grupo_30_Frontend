import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogapplicantskills',
  templateUrl: './dialogapplicantskills.component.html',
  styleUrls: ['./dialogapplicantskills.component.css']
})
export class DialogapplicantskillsComponent implements OnInit {

  constructor() { }

  closeDialog(){
    console.log("entro");
  }

  ngOnInit() {
  }

}
