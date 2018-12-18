import { FilterService } from '../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { JsdataService } from './../../job-seeker/services/jsdata.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  jobs = [];
  constructor(
    private jobSeekerService: JsdataService,
    private filterService: FilterService
  ) {
    filterService.filterEvent$.on("filter", filters => {
      console.log(filters);
      this.filterJobs(filters);
    });
  }

  ngOnInit() {
    this.loadJobs();
  }

  private loadJobs(filters = {}){
    return this.jobSeekerService.loadJobs(filters).subscribe(response => {
      this.jobs = response["data"];
    });
  }

  private filterJobs(filters = {}){
    return this.jobSeekerService.filterJobs(filters).subscribe(response => {
      this.jobs = response["data"];
    });
  }
}
