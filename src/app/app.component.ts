import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontabc-front';
  showHead: boolean = false;
  showOptions: boolean = false;
  translate2!: TranslateService;

  ngOnInit() {
  }

  changeLang(pref: string){
    localStorage.setItem("lang", pref);
    this.translatelang(this.translate2);
  }

  translatelang(translate: TranslateService){
    if(localStorage.getItem("lang") === undefined){
      translate.setDefaultLang('en');
    }
    else if(localStorage.getItem("lang") === 'es'){
      translate.setDefaultLang('es');
    }
    else if(localStorage.getItem("lang") === 'en'){
      translate.setDefaultLang('en');
    }
  }

  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    this.translatelang(translate);
    this.translate2 = translate;

  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event['url'].toString());
        if (event['url'] == '/login' || event['url'] == '/') {
          this.showHead = false;
          console.log("entro false");
        } else {
          // console.log("NU")
          this.showHead = true;
          console.log("entro true");
        }

        if (event['url'] == '/signup/company' || event['url'] == '/signup/applicant' || event['url'] == '/signup') {
          this.showOptions = false;
          console.log("entro false");
        } else {
          // console.log("NU")
          this.showOptions = true;
          console.log("entro true");
        }
      }
    });
  }
}
