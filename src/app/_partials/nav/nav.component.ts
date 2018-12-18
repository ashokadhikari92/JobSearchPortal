import { AuthService } from '../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }
  isEmployeePage(){
    if ( this.authService.isEmployer()) {
      return true;
    }
    return false;
  }
  isSeekerPage(){
    if ( this.authService.isSeeker()) {
      return true;
    }
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
