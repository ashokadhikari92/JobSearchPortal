import { HomeComponent } from './job-seeker/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerHomeComponent } from './employer/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'employer', component: EmployerHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
