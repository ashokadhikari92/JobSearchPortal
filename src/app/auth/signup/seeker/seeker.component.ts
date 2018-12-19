import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: "app-seeker",
  templateUrl: "./seeker.component.html",
  styleUrls: ["./seeker.component.css"]
})
export class SeekerSignupComponent implements OnInit {
  private signupForm: FormGroup;
  private submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
    this.signupForm = formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      accept: [0]
    });

    // this.signupForm.valueChanges.subscribe(value => console.log(value));
  }

  ngOnInit() {}

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      console.log("Invalid")
      return;
    }

    const formValues = this.signupForm.value;

    const user = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password
    };

    this.authService.signup(user).subscribe(
      response => {
        return this.router.navigate(["/login"]);
      },
      error => {
        console.log(error);
        this.flashMessage.show(error.error.error.message, { cssClass: 'alert-danger'});
      }
    );
  }
}
