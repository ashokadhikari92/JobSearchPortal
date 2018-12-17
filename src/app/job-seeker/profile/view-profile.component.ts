import { Component, OnInit, Input } from '@angular/core';
import { JsdataService } from './../services/jsdata.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewJobSeekerProfileComponent implements OnInit {

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

  constructor(private jsDataService: JsdataService) { }

  ngOnInit() {
    let data;
    this.jsDataService
    .loadProfile()
    .subscribe(
      response => {

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

      },
      error => console.log(error)
    );
    
   
  }
  


}
