import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './_partials/nav/nav.component';
import { FooterComponent } from './_partials/footer/footer.component';
import { HomeComponent } from './job-seeker/home/home.component';
import { HeaderComponent } from './job-seeker/header/header.component';
import { EmployerHomeComponent } from './employer/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    EmployerHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
