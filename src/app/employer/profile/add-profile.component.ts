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
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddEmployerProfileComponent implements OnInit {
  private employeeProfileForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private employerService : EmployerService) { 

    this.employeeProfileForm = formBuilder.group({
      companyName: ['', [Validators.required]],
      websiteLink: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      introduction: ['', [Validators.required]],
      typeOfBusiness: ['', [Validators.required]],
      street : ['', [Validators.required]],
      city : ['', [Validators.required]],
      state : ['', [Validators.required]],
      zip : ['', [Validators.required]]
    
    });

  }

  onSubmit() {
    const profile = {
      companyName: this.employeeProfileForm.value.companyName,
      websiteLink: this.employeeProfileForm.value.websiteLink,
      email: this.employeeProfileForm.value.email,
      contactNo: this.employeeProfileForm.value.contactNo,
      introduction: this.employeeProfileForm.value.introduction,
      typeOfBusiness: this.employeeProfileForm.value.typeOfBusiness,
      street : this.employeeProfileForm.value.street,
      city : this.employeeProfileForm.value.city,
      state : this.employeeProfileForm.value.state,
      zip : this.employeeProfileForm.value.zip

    };

    this.employerService
        .addEmployerProfile(profile)
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
