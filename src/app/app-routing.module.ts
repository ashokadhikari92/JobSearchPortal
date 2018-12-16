import { HomeComponent } from './job-seeker/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerHomeComponent } from './employer/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SeekerSignupComponent } from './auth/signup/seeker/seeker.component';
import { EmployerSignupComponent } from './auth/signup/employer/employer.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { SeekerGuard } from './auth/guards/seeker.guard';
import { EmployerGuard } from './auth/guards/employer.guard';
import { HomeGuard } from './auth/guards/home.guard';
import { CreateNewJobComponent } from './employer/job/create-new-job.component';
import { AddEmployerProfileComponent } from './employer/profile/add-profile.component';
import { ViewEmployerProfileComponent } from './employer/profile/view-profile.component';
import { JobDetailComponent } from './employer/job/job-detail.component';
import { AddJobSeekerProfileComponent } from './job-seeker/add-profile/add-profile.component';
import { MyJobsComponent } from './job-seeker/my-jobs/my-jobs.component';
import { ViewJobSeekerProfileComponent } from './job-seeker/view-profile/view-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  { path: 'employer', component: EmployerHomeComponent, canActivate: [AuthGuard, EmployerGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SeekerSignupComponent},
  { path: 'employer/signup', component: EmployerSignupComponent},
  { path: 'employer/job', component: CreateNewJobComponent},
  { path: 'employer/job/detail', component: JobDetailComponent},
  { path: 'employer/profile', component: AddEmployerProfileComponent},
  { path: 'employer/profile/viewProfile', component: ViewEmployerProfileComponent}
  { path: 'job-seeker/myjobs', component: MyJobsComponent},
  { path: 'job-seeker/add/profile', component: AddJobSeekerProfileComponent},
  { path: 'job-seeker/view/profile', component: ViewJobSeekerProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
