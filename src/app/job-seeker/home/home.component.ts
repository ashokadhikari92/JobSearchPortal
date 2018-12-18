import { Component, OnInit } from '@angular/core';
import { JsdataService } from './../../job-seeker/services/jsdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  jobs;
  constructor(private jobSeekerService : JsdataService) { }

  ngOnInit() {
    
    return this.jobSeekerService.loadJobs().subscribe(
      response => {
        this.jobs = response['data'];  
        
      });
  }

}
