import { AuthService } from "../../auth/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { SeekerProfile } from "../../job-seeker/profile.model";
import * as fromSeekerProfile from "../../job-seeker/store/profile.reducers";
import { EmployerProfile } from "../../employer/profile.model";
import * as fromEmployerProfile from "../../employer/store/profile.reducers";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  public seekerProfile: Observable<SeekerProfile>;
  public employerProfile: Observable<EmployerProfile>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private seekerStore: Store<fromSeekerProfile.State>,
    private employerStore: Store<fromEmployerProfile.State>
  ) {}

  ngOnInit() {
    this.seekerProfile = this.seekerStore.select("seekerProfile");
    this.employerProfile = this.employerStore.select("employerProfile");
  }

  isAuthenticated() {
    return this.authService.isLoggedIn();
  }
  isEmployeePage() {
    if (this.authService.isEmployer()) {
      return true;
    }
    return false;
  }
  isSeekerPage() {
    if (this.authService.isSeeker()) {
      return true;
    }
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
