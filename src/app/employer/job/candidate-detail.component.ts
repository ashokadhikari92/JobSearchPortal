import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from './../services/employer.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

  firstName:string;
  lastName:string;
  email:string;
  phone:string;
  educationLevel:string;
  latestJobLevel:string;
  workExperience:string;
  country:string;
  location:string;
  skillSet:string;
  linkedinProfile:string;
  resume: string;

  constructor(private employerService : EmployerService, route: ActivatedRoute) {

    route.params.subscribe(param => {

    let cId =  param.id;

    let data;
    this.employerService
    .getCandidateById(cId)
    .subscribe(
      response => {
        console.log(response);
        data = response;
        this.firstName = data["data"]["firstName"];
        this.lastName = data["data"]["lastName"];
        this.email = data["data"]["email"];
        this.phone = data["data"]["profile"]["user"]["phone"];
        this.educationLevel = data["data"]["profile"]["user"]["educationLevel"];
        this.latestJobLevel = data["data"]["profile"]["user"]["latestJobLevel"];
        this.workExperience = data["data"]["profile"]["user"]["workExperience"];
        this.country = data["data"]["profile"]["user"]["country"];
        this.location = data["data"]["profile"]["user"]["location"];
        this.skillSet = data["data"]["profile"]["user"]["skillSet"];
        this.linkedinProfile = data["data"]["profile"]["user"]["linkedinProfile"];
        this.resume = data["data"]["profile"]["user"]["resume"];
      },
      error => console.log(error)
    );
  });

  }

  ngOnInit() {


  }
}
