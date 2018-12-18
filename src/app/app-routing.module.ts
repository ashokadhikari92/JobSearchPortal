import { DefaultJobDetailComponent } from './job-seeker/job/job-detail.component';
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
import { JobDetailListComponent } from './employer/job/job-detail-List.component';
import { AddJobSeekerProfileComponent } from './job-seeker/profile/add-profile.component';
import { MyJobsComponent } from './job-seeker/my-jobs/my-jobs.component';
import { ViewJobSeekerProfileComponent } from './job-seeker/profile/view-profile.component';
import { CandidateDetailComponent } from './employer/job/candidate-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  { path: 'job/detail/:id' , component: DefaultJobDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SeekerSignupComponent},
  { path: 'employer/signup', component: EmployerSignupComponent},
  { path: 'employer/job', component: CreateNewJobComponent, canActivate: [AuthGuard, EmployerGuard]},
  { path: 'employer/job/detail/:id', component: JobDetailListComponent, canActivate: [AuthGuard, EmployerGuard]},
  { path: 'employer/profile', component: AddEmployerProfileComponent, canActivate: [AuthGuard, EmployerGuard]},
  { path: 'employer/profile/viewProfile', component: ViewEmployerProfileComponent, canActivate: [AuthGuard, EmployerGuard]},
  { path: 'employer/candidate/detail/:id' , component: CandidateDetailComponent, canActivate: [AuthGuard, EmployerGuard]},
  { path: 'myjobs', component: MyJobsComponent, canActivate: [AuthGuard, SeekerGuard]},
  { path: 'profile', component: AddJobSeekerProfileComponent, canActivate: [AuthGuard, SeekerGuard]},
  { path: 'employer', component: EmployerHomeComponent, canActivate: [AuthGuard, EmployerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
