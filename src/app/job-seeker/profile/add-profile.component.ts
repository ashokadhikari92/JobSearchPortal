import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsdataService } from './../services/jsdata.service';
import { phoneNumberValidator } from './../validators/phone-validator';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddJobSeekerProfileComponent implements OnInit {

  private addProfile: FormGroup;

  constructor(
    private jsDataService: JsdataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.addProfile = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneNumberValidator]],
      educationLevel: ['', [Validators.required]],
      latestJobLevel: ['', [Validators.required]],
      workExperience: ['', [Validators.required, Validators.pattern]],
      country: ['', [Validators.required, Validators.pattern]],
      location: ['', [Validators.required, Validators.pattern]],
      skillSet: ['', [Validators.required]],
      linkedinProfile: ['', [Validators.required, Validators.pattern]],
      accept: [0]
    });

    // this.signupForm.valueChanges.subscribe(value => console.log(value));
  }

  ngOnInit() {}

  onSubmit() {
    //console.log(this.addProfile);
    const formValues = this.addProfile.value;
    
    //console.log(formValues);

    const seeker = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      educationLevel: formValues.educationLevel,
      latestJobLevel: formValues.latestJobLevel,
      workExperience: formValues.workExperience,
      country: formValues.country,
      location: formValues.location,
      skillSet: formValues.skillSet,
      linkedinProfile: formValues.linkedinProfile
    };
   
//console.log(seeker);

    this.jsDataService
    .addProfile(seeker)
    .subscribe(
      response => {
        console.log(response);
        //return this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }

  get firstName() {
    return this.addProfile.get('firstName');
  }
  
  get lastName() {
    return this.addProfile.get('lastName');
  }

  get email() {
    return this.addProfile.get('email');
  }
  
  get phone() {
    return this.addProfile.get('phone');
  }

  get educationLevel() {
    return this.addProfile.get('educationLevel');
  }
  
  get latestJobLevel() {
    return this.addProfile.get('latestJobLevel');
  }

  get workExperience() {
    return this.addProfile.get('workExperience');
  }

  get country() {
    return this.addProfile.get('country');
  }

  get location() {
    return this.addProfile.get('location');
  }

  get skillSet() {
    return this.addProfile.get('skillSet');
  }

  get linkedinProfile() {
    return this.addProfile.get('linkedinProfile');
  }

}
