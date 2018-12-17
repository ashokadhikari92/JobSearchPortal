import { Component, OnInit } from '@angular/core';
import { EmployerService } from './../../employer/services/employer.service';

@Component({
  selector: 'app-job-detail-list',
  templateUrl: './job-detail-List.component.html',
  styleUrls: ['./job-detail-List.component.css']
})
export class JobDetailListComponent implements OnInit {

  constructor(private employerService : EmployerService) {  }

  //to do list - pass the id here
  ngOnInit() {
    let data;
    this.employerService
    .getJobDetailById('5c173b6e675f6e0be85d261b')    
    .subscribe(
      response => {
          data = response['data']['candidates'];  
          
          
          // this.name = data['data']['company'];
          // this.noOfPosition = data['data']['numberOfPosition'];
          // this.location = data['data']['location']['city'] + ' ' + data['data']['location']['state'] ;
          // this.minSalary = data['data']['salaryRange']['min'];
          // this.maxSalary = data['data']['salaryRange']['max'];
          // this.employeeType = data['data']['employeeType'];
          // this.jobDescription = data['data']['description'];
          console.log(data);  
      },
      error => console.log(error)
    );
    
   
  }

}
