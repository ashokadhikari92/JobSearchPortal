import { Component, OnInit } from '@angular/core';
import { JsdataService } from './../../job-seeker/services/jsdata.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  jobs;
  constructor(private jobSeekerService : JsdataService) { }

  ngOnInit() {
    return this.jobSeekerService.loadMyJobs().subscribe(
      response => {
        this.jobs = response['data'];
        console.log(this.jobs);
      },
      (err) => {
        console.log("Error in data loading: ", err);
      }
    );
  }

}
