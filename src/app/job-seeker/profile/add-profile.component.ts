
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JsdataService } from "./../services/jsdata.service";
import { phoneNumberValidator } from "./../validators/phone-validator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { SeekerProfile } from "../profile.model";
import * as ProfileActions from "../store/profile.actions";
import * as fromProfile from "../store/profile.reducers";

import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-add-profile",
  templateUrl: "./add-profile.component.html",
  styleUrls: ["./add-profile.component.css"]
})
export class AddJobSeekerProfileComponent implements OnInit {
  private addProfile: FormGroup;
  public seekerProfile: Observable<SeekerProfile>;

  constructor(
    private jsDataService: JsdataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromProfile.State>
  ) {
    this.addProfile = formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, phoneNumberValidator]],
      educationLevel: ["", [Validators.required]],
      latestJobLevel: ["", [Validators.required]],
      workExperience: ["", [Validators.required, Validators.pattern]],
      country: ["", [Validators.required, Validators.pattern]],
      location: ["", [Validators.required, Validators.pattern]],
      skillSet: ["", [Validators.required]],
      linkedinProfile: ["", [Validators.required]],
      accept: [0]
    });
  }

  ngOnInit() {
    this.seekerProfile = this.store.select('seekerProfile');
    this.seekerProfile.subscribe(result => {
      const profile = result['profile'];
      this.addProfile.patchValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        educationLevel: profile.educationLevel,
        latestJobLevel: profile.latestJobLevel,
        workExperience: profile.workExperience,
        country: profile.country,
        location: profile.location,
        skillSet: profile.skillSet.join(','),
        linkedinProfile: profile.linkedinProfile
      });
    });
  }

  onSubmit() {
    const formValues = this.addProfile.value;

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
      skillSet: formValues.skillSet.split(","),
      linkedinProfile: formValues.linkedinProfile
    };

    this.jsDataService.addProfile(seeker).subscribe(
      response => {
        console.log(response);
        this.store.dispatch(new ProfileActions.SaveAllDetail(seeker));
      },
      error => console.log(error)
    );
  }

  get firstName() {
    return this.addProfile.get("firstName");
  }

  get lastName() {
    return this.addProfile.get("lastName");
  }

  get email() {
    return this.addProfile.get("email");
  }

  get phone() {
    return this.addProfile.get("phone");
  }

  get educationLevel() {
    return this.addProfile.get("educationLevel");
  }

  get latestJobLevel() {
    return this.addProfile.get("latestJobLevel");
  }

  get workExperience() {
    return this.addProfile.get("workExperience");
  }

  get country() {
    return this.addProfile.get("country");
  }

  get location() {
    return this.addProfile.get("location");
  }

  get skillSet() {
    return this.addProfile.get("skillSet");
  }

  get linkedinProfile() {
    return this.addProfile.get("linkedinProfile");
  }
}
