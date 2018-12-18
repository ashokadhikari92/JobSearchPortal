import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from './../../employer/services/employer.service';
import { JsdataService } from './../../job-seeker/services/jsdata.service';



@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  name: string;
  id: string;
  noOfPosition: string;
  location: string;
  minSalary: string;
  maxSalary: string;
  employeeType: string;
  jobDescription: string;

  constructor(private employerService: EmployerService, route: ActivatedRoute, private jobSeekerService: JsdataService) {
    let data;

    route.params.subscribe(param => {
      let jobId = param.id;
      console.log(jobId);

      this.jobSeekerService
        .getJobDetailById(jobId)
        .subscribe(
          response => {
            console.log(response);
            data = response;
            this.id = data['data']['_id']
            this.name = data['data']['title'];
            this.noOfPosition = data['data']['numberOfPosition'];
            this.location = data.data.location?data['data']['location']['city'] + ' ' + data['data']['location']['state']:'';
            this.minSalary = data['data']['salaryRange']['min'];
            this.maxSalary = data['data']['salaryRange']['max'];
            this.employeeType = data['data']['employeeType'];
            this.jobDescription = data['data']['description'];
            console.log(data);
          },
          error => console.log(error)
        );

    });

  }



  ngOnInit() {
  }
  isJobSeeker() {
    return this.employerService.isSeeker();
  }

  applyJob() {
    return this.jobSeekerService.applyJob(this.id).subscribe(
      response => { console.log(response) });
  }


}
