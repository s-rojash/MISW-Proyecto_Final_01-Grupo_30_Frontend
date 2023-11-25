import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit  {


  constructor(
    public translate: TranslateService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }
  closeSession(){
    let language : string | null = "";
    language = localStorage.getItem("lang");

    localStorage.clear();

    if(language != null){
      localStorage.setItem("lang", language);
    }
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.closeSession();
  }
}
