import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private jwtToken = null;
  private tokenTimer;
  private userRole;
  constructor(private http: HttpClient, private router: Router) { }

  public signup(user) {
    return this.http.post('http://localhost:3600/api/users/signup', user);
  }

  public employerSignup(user) {
    return this.http.post('http://localhost:3600/api/users/employer/signup', user);
  }

  public login(user) {
    return this.http.post('http://localhost:3600/api/users/login', user);
  }

  public getToken() {
    return localStorage.token;
  }

  public isLoggedIn() {
    return localStorage.isAuthenticated;
  }

  public isSeeker(){
    return localStorage.role === 'seeker' ? true : false;
  }

  public isEmployer() {
    return localStorage.role === 'employer' ? true : false;
  }

  public logout() {
    this.jwtToken = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/home']);
  }

  public loginSuccess(response){
    const token = response._token;
    const role = response._role;
    const expiresIn = response._expiresIn;
    this.isAuthenticated = true;
    this.jwtToken = token;
    this.setAuthTimer(expiresIn);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    this.saveAuthData(token, role, expirationDate);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string,role: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !role || !expirationDate) {
      return;
    }
    return {
      token: token,
      role: role,
      expirationDate: new Date(expirationDate)
    }
  }
}
