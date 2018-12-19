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
  selector: "app-employer",
  templateUrl: "./employer.component.html",
  styleUrls: ["./employer.component.css"]
})
export class EmployerSignupComponent implements OnInit {
  private signupForm: FormGroup;
  submitted = false;

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
      return;
    }

    const formValues = this.signupForm.value;

    const user = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password
    };

    this.authService.employerSignup(user).subscribe(
      response => {
        return this.router.navigate(["/login"]);
      },
      error => {
        this.flashMessage.show(error.error.error.message, { cssClass: 'alert-danger'});
      }
    );
  }
}
