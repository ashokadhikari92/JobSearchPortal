import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as SeekerProfileActions from "../../job-seeker/store/profile.actions";
import * as fromSeekerProfile from "../../job-seeker/store/profile.reducers";
import * as EmployerProfileActions from "../../employer/store/profile.actions";
import * as fromEmployerProfile from "../../employer/store/profile.reducers";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated = false;
  private jwtToken = null;
  private tokenTimer;
  private userRole;
  constructor(
    private http: HttpClient,
    private router: Router,
    private seekerStore: Store<fromSeekerProfile.State>,
    private employerStore: Store<fromEmployerProfile.State>
  ) {}

  public signup(user) {
    return this.http.post("http://localhost:3600/api/users/signup", user);
  }

  public employerSignup(user) {
    return this.http.post(
      "http://localhost:3600/api/users/employer/signup",
      user
    );
  }

  public login(user) {
    return this.http.post("http://localhost:3600/api/users/login", user);
  }

  public getToken() {
    return localStorage.token;
  }

  public isLoggedIn() {
    return localStorage.isAuthenticated;
  }

  public isSeeker() {
    return localStorage.role === "seeker" ? true : false;
  }

  public isEmployer() {
    return localStorage.role === "employer" ? true : false;
  }

  public logout() {
    this.jwtToken = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/home"]);
  }

  public loginSuccess(response) {
    const token = response._token;
    const role = response._role;
    const expiresIn = response._expiresIn;
    const profile = response._profile;
    this.isAuthenticated = true;
    this.jwtToken = token;
    this.setAuthTimer(expiresIn);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);

    role === "seeker"
      ? this.updateSeekerProfile(profile)
      : this.updateEmployerProfile(profile);
    this.saveAuthData(token, role, expirationDate, profile);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    token: string,
    role: string,
    expirationDate: Date,
    profile
  ) {
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", role);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    localStorage.removeItem("expiration");
    localStorage.removeItem("seeker_profile");
    localStorage.removeItem("employer_profile");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !role || !expirationDate) {
      return;
    }
    return {
      token: token,
      role: role,
      expirationDate: new Date(expirationDate)
    };
  }

  private updateSeekerProfile(profile) {
    const newProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      educationLevel: profile.educationLevel,
      latestJobLevel: profile.latestJobLevel,
      workExperience: profile.workExperience,
      country: profile.country,
      location: profile.location,
      skillSet: profile.skillSet.map(skill => skill.name),
      linkedinProfile: profile.linkedinProfile,
      resume: profile.resume
    };

    localStorage.setItem('seeker_profile', JSON.stringify(newProfile));
    this.seekerStore.dispatch(new SeekerProfileActions.SaveAllDetail(newProfile));
  }

  private updateEmployerProfile(profile) {
    const newProfile = {
      fullName: profile.fullName,
      name: profile.name,
      website: profile.website,
      contactEmail: profile.contactEmail,
      contactPhone: profile.contactPhone,
      introduction: profile.introduction,
      street: profile.address.street,
      city: profile.address.city,
      state: profile.address.state,
      zipCode: profile.address.zipCode
    };

    localStorage.setItem('employer_profile', JSON.stringify(newProfile));
    this.employerStore.dispatch(new EmployerProfileActions.SaveAllDetail(newProfile));
  }
}
