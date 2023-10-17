import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontabc-front';

  showHead: boolean = false;

  ngOnInit() {
  }

  constructor(private router: Router) {
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
      }
    });
  }
}
