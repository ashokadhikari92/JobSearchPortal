import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JobSearch';

  constructor(private router: Router) {}

  isHomePage() {
    if (this.router.url === '/' || this.router.url === '') {
      return true;
    }
    return false;
  }
  isEmployeePage(){
    if (this.router.url === '/employer') {
      return true;
    }
    return false;
  }
}
