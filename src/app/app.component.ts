import { Component, ChangeDetectorRef } from '@angular/core';
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

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  changeLang(pref: string){
    localStorage.setItem("lang", pref);
    this.translatelang(this.translate2);
  }

  translatelang(translate: TranslateService){
    if(localStorage.getItem("lang") === null){
      translate.setDefaultLang('en');
      localStorage.setItem("lang", "en");
    }
    else if(localStorage.getItem("lang") === 'es'){
      translate.setDefaultLang('es');
    }
    else if(localStorage.getItem("lang") === 'en'){
      translate.setDefaultLang('en');
    }
  }

  myprofile(){
    if(localStorage.getItem("API_EMPRESA_ID") != null){
      this.router.navigate(['/company/edit']);
    }
    else if(localStorage.getItem("API_CANDIDATO_ID") != null){
      this.router.navigate(['/applicant/edit']);
    }
  }

  logout(){
    this.router.navigate(['/logout']);
  }

  constructor(private router: Router, public translate: TranslateService,
              private changeDetector: ChangeDetectorRef) {
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

          if(!localStorage.getItem("API_TOKEN") && event['url'] != '/signup/company' && event['url'] != '/signup/applicant'
            && event['url'] != '/login' && event['url'] != '/'){
            router.navigate(['/login']);
          }
        }
      }
    });


  }
}
