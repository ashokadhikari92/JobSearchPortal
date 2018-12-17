import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { EmployerService } from './../services/employer.service';


@Component({
  selector: 'app-create-new-job',
  templateUrl: './create-new-job.component.html',
  styleUrls: ['./create-new-job.component.css']
})
export class CreateNewJobComponent implements OnInit {
  private createJobForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private employerService : EmployerService) { 

    this.createJobForm = formBuilder.group({
      jobTitle: ['', [Validators.required]],
      noOfPosition: ['', [Validators.required]],
      minSalary: ['', [Validators.required]],
      maxSalary: ['', [Validators.required]],
      employeeType: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
      deadline : ['', [Validators.required]]         
    });

  }

  get jobTitle() { return this.createJobForm.get('jobTitle'); }

  get noOfPosition() { return this.createJobForm.get('noOfPosition'); }

  get minSalary() { return this.createJobForm.get('minSalary'); }

  get maxSalary() { return this.createJobForm.get('maxSalary'); }

  get jobDescription() { return this.createJobForm.get('jobDescription'); }

  get deadline() { return this.createJobForm.get('deadline'); }

  onSubmit() {
    const jobForm = {
      jobTitle: this.createJobForm.value.jobTitle,
      noOfPosition: this.createJobForm.value.noOfPosition,
      minSalary: this.createJobForm.value.minSalary,
      maxSalary: this.createJobForm.value.maxSalary,
      employeeType: this.createJobForm.value.employeeType,
      jobDescription: this.createJobForm.value.jobDescription,
      deadline : this.createJobForm.value.deadline,     

    };
  console.log("jobForm submit");
    this.employerService
        .addJob(jobForm)
        .subscribe(
          response => {           
            console.log(response);
          },
          error => console.log(error)
        );

  }


  ngOnInit() {
    
  }

}
