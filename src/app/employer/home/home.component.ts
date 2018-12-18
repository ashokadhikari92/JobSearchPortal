import { Component, OnInit } from '@angular/core';
import { EmployerService } from './../services/employer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class EmployerHomeComponent implements OnInit {

  constructor(private employerService : EmployerService) { 
  }
  jobs;
  ngOnInit() {
    

    this.employerService
    .getJobsByEmployer()
    .subscribe(
      response => {

        console.log(response);
       this.jobs = response['data'];
       //console.log(jobs);
        // this.firstName = data["data"]["firstName"];
        // this.lastName = data["data"]["lastName"];
        // this.email = data["data"]["email"];
        // this.phone = data["data"]["profile"]["user"]["phone"];
        // this.educationLevel = data["data"]["profile"]["user"]["educationLevel"];
        // this.latestJobLevel = data["data"]["profile"]["user"]["latestJobLevel"];
        // this.workExperience = data["data"]["profile"]["user"]["workExperience"];
        // this.country = data["data"]["profile"]["user"]["country"];
        // this.location = data["data"]["profile"]["user"]["location"];
        // this.skillSet = data["data"]["profile"]["user"]["skillSet"];
        // this.linkedinProfile = data["data"]["profile"]["user"]["linkedinProfile"];

      },
      error => console.log(error)
    );
    
   
  }

}
