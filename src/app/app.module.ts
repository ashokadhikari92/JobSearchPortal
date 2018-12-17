import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { NavComponent } from './_partials/nav/nav.component';
import { FooterComponent } from './_partials/footer/footer.component';
import { HomeComponent } from './job-seeker/home/home.component';
import { HeaderComponent } from './job-seeker/header/header.component';
import { EmployerHomeComponent } from './employer/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateNewJobComponent } from './employer/job/create-new-job.component';
import { AddEmployerProfileComponent } from './employer/profile/add-profile.component';
import { ViewEmployerProfileComponent } from './employer/profile/view-profile.component';
import { JobDetailComponent } from './employer/job/job-detail.component';
import { HeaderEmpComponent } from './employer/header/header.component';
import { AddJobSeekerProfileComponent } from './job-seeker/profile/add-profile.component';
import { ViewJobSeekerProfileComponent } from './job-seeker/profile/view-profile.component';
import { JobListComponent } from './common/job-list/job-list.component';
import { MyJobsComponent } from './job-seeker/my-jobs/my-jobs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    EmployerHomeComponent,
    CreateNewJobComponent,
    AddEmployerProfileComponent,
    ViewEmployerProfileComponent,
    JobDetailComponent,
    HeaderEmpComponent,
    AddJobSeekerProfileComponent,
    ViewJobSeekerProfileComponent,
    JobListComponent,
    MyJobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
