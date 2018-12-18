import { LoaderService } from './../../_partials/services/loader.service';
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
    private filterService: FilterService,
    private loader: LoaderService
  ) {
    filterService.filterEvent$.on("filter", filters => {
      this.filterJobs(filters);
    });
  }

  ngOnInit() {
    this.loadJobs();
  }

  private loadJobs(filters = {}) {
    this.loader.showLoader();
    return this.jobSeekerService.loadJobs(filters).subscribe(
      response => {
        this.jobs = response["data"];
        this.loader.stopLoader();
      },
      err => {
        console.log(err);
        this.loader.stopLoader();
      }
    );
  }

  private filterJobs(filters = {}) {
    this.loader.showLoader();
    return this.jobSeekerService.filterJobs(filters).subscribe(
      response => {
        this.jobs = response["data"];
        this.loader.stopLoader();
      },
      err => {
        console.log(err);
        this.loader.stopLoader();
      }
    );
  }
}
