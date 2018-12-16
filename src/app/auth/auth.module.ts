import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SeekerSignupComponent } from './signup/seeker/seeker.component';
import { EmployerSignupComponent } from './signup/employer/employer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth';

@NgModule({
  declarations: [
    LoginComponent,
    SeekerSignupComponent,
    EmployerSignupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    LoginComponent,
    SeekerSignupComponent,
    EmployerSignupComponent
  ]
})
export class AuthModule { }
