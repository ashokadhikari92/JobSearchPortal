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

    
    this.employerService
    .getEmployerProfile()
    .subscribe(
      res => {
        //console.log(res);       
        this.employeeProfileForm.patchValue({
          companyName: res['data']['name'],
          websiteLink: res['data']['website'],
          email: res['data']['contactEmail'],
          contactNo: res['data']['contactPhone'],
          introduction: res['data']['introduction'],
          
          street : res['data']['address']['street'],
          city :  res['data']['address']['city'],
          state :  res['data']['address']['state'],
          zip :  res['data']['address']['zipCode']
        });
      },
      err => {console.log(err);}
    );
     
 
    this.employeeProfileForm = formBuilder.group({
      companyName: ['', [Validators.required]],
      websiteLink: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      introduction: ['', [Validators.required]],
     
      street : ['', [Validators.required]],
      city : ['', [Validators.required]],
      state : ['', [Validators.required]],
      zip : ['', [Validators.required]]    
    });

  }

  get companyName() { return this.employeeProfileForm.get('companyName'); }

  get websiteLink() { return this.employeeProfileForm.get('websiteLink'); }

  get email() { return this.employeeProfileForm.get('email'); }

  get contactNo() { return this.employeeProfileForm.get('contactNo'); }

  get introduction() { return this.employeeProfileForm.get('introduction'); }



  get street() { return this.employeeProfileForm.get('street'); }

  get city() { return this.employeeProfileForm.get('city'); }

  get state() { return this.employeeProfileForm.get('state'); }

  get zip() { return this.employeeProfileForm.get('zip'); }


  onSubmit() {
    const profile = {
      companyName: this.employeeProfileForm.value.companyName,
      website : this.employeeProfileForm.value.websiteLink,
      email: this.employeeProfileForm.value.email,
      contactNo: this.employeeProfileForm.value.contactNo,
      introduction: this.employeeProfileForm.value.introduction,     
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
