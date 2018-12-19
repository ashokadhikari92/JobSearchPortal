import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { EmployerService } from './../services/employer.service';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { EmployerProfile } from "../profile.model";
import * as ProfileActions from "../store/profile.actions";
import * as fromProfile from "../store/profile.reducers";
import { LoaderService } from './../../_partials/services/loader.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: "app-add-profile",
  templateUrl: "./add-profile.component.html",
  styleUrls: ["./add-profile.component.css"]
})
export class AddEmployerProfileComponent implements OnInit {
  private employeeProfileForm: FormGroup;
  private employerProfile: Observable<EmployerProfile>;
  private fullName = "";

  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService,
    private store: Store<fromProfile.State>,
    private flashMessage: FlashMessagesService,
    private loader: LoaderService
  ) {
    this.employeeProfileForm = formBuilder.group({
      companyName: ["", [Validators.required]],
      websiteLink: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      contactNo: ["", [Validators.required]],
      introduction: ["", [Validators.required]],

      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zip: ["", [Validators.required]]
    });
  }

  get companyName() {
    return this.employeeProfileForm.get("companyName");
  }

  get websiteLink() {
    return this.employeeProfileForm.get("websiteLink");
  }

  get email() {
    return this.employeeProfileForm.get("email");
  }

  get contactNo() {
    return this.employeeProfileForm.get("contactNo");
  }

  get introduction() {
    return this.employeeProfileForm.get("introduction");
  }

  get street() {
    return this.employeeProfileForm.get("street");
  }

  get city() {
    return this.employeeProfileForm.get("city");
  }

  get state() {
    return this.employeeProfileForm.get("state");
  }

  get zip() {
    return this.employeeProfileForm.get("zip");
  }

  onSubmit() {
    const profile = {
      name: this.employeeProfileForm.value.companyName,
      website: this.employeeProfileForm.value.websiteLink,
      contactEmail: this.employeeProfileForm.value.email,
      contactPhone: this.employeeProfileForm.value.contactNo,
      introduction: this.employeeProfileForm.value.introduction,
      street: this.employeeProfileForm.value.street,
      city: this.employeeProfileForm.value.city,
      state: this.employeeProfileForm.value.state,
      zipCode: this.employeeProfileForm.value.zip,
      fullName: this.fullName
    };

    this.loader.showLoader();
    this.employerService.addEmployerProfile(profile).subscribe(
      response => {
        this.loader.stopLoader();
        this.flashMessage.show('Profile updated successfully.' , { cssClass: 'alert-success'});
        this.store.dispatch(new ProfileActions.SaveAllDetail(profile));
        localStorage.setItem('employer_profile', JSON.stringify(profile));
      },
      error => {
        console.log(error);
        this.loader.stopLoader();
        this.flashMessage.show('Failed to update your profile.', { cssClass: 'alert-danger'});
      }
    );
  }

  ngOnInit() {
    this.employerProfile = this.store.select("employerProfile");
    this.employerProfile.subscribe(result => {
      const profile = result["profile"];
      this.fullName = profile.fullName;
      localStorage.setItem("employer_profile", JSON.stringify(profile));
      this.employeeProfileForm.patchValue({
        companyName: profile.name,
        websiteLink: profile.website,
        email: profile.contactEmail,
        contactNo: profile.contactPhone,
        introduction: profile.introduction,
        street: profile.street,
        city: profile.city,
        state: profile.state,
        zip: profile.zipCode
      });
    });
  }
}
