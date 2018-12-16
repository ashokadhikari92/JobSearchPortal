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
import { AddProfileComponent } from './employer/profile/add-profile.component';
import { ViewProfileComponent } from './employer/profile/view-profile.component';
import { JobDetailComponent } from './employer/job/job-detail.component';
import { HeaderEmpComponent } from './employer/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    EmployerHomeComponent,
    CreateNewJobComponent,
    AddProfileComponent,
    ViewProfileComponent,
    JobDetailComponent,
    HeaderEmpComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
