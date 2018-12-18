import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from './../../employer/services/employer.service';

@Component({
  selector: 'app-job-detail-list',
  templateUrl: './job-detail-List.component.html',
  styleUrls: ['./job-detail-List.component.css']
})
export class JobDetailListComponent implements OnInit {

 data;
  constructor(private employerService : EmployerService,route: ActivatedRoute) { 

    route.params.subscribe(param => {
      let jobId =  param.id;
     
  
    this.employerService
    .getJobDetailById(jobId)    
    .subscribe(
      response => {
          this.data = response['data']['candidates'];  
          
          
          // this.name = data['data']['company'];
          // this.noOfPosition = data['data']['numberOfPosition'];
          // this.location = data['data']['location']['city'] + ' ' + data['data']['location']['state'] ;
          // this.minSalary = data['data']['salaryRange']['min'];
          // this.maxSalary = data['data']['salaryRange']['max'];
          // this.employeeType = data['data']['employeeType'];
          // this.jobDescription = data['data']['description'];
          console.log( "data...." + response);  
      },
      error => console.log(error)
    );

  });

   }

  //to do list - pass the id here
  ngOnInit() {
    
   
  }

}
