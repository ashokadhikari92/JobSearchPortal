import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsdataService } from './../services/jsdata.service';
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
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      educationLevel: ['', [Validators.required]],
      latestJobLevel: ['', [Validators.required]],
      workExperience: ['', [Validators.required]],
      country: ['', [Validators.required]],
      location: ['', [Validators.required]],
      skillSet: ['', [Validators.required]],
      linkedinProfile: ['', [Validators.required]],
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

}
