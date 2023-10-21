import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogtypesignup',
  templateUrl: './dialogtypesignup.component.html',
  styleUrls: ['./dialogtypesignup.component.css']
})
export class DialogtypesignupComponent implements OnInit {

  constructor() { }

  closeDialog(){
    console.log("entro");
  }

  ngOnInit() {
  }

}
