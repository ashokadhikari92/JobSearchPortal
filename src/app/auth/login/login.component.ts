import { LoaderService } from '../../_partials/services/loader.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  private loginForm: FormGroup;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private flashMessage: FlashMessagesService
  ) {
    this.loginForm = formBuilder.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["", [Validators.required]],
      remember: [1, [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls;}
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loaderService.showLoader();
    this.authService.login(login).subscribe(
      response => {
        this.loaderService.stopLoader();
        this.authService.loginSuccess(response);
        this.router.navigate(["/home"]);
        console.log(response);
      },
      error => {
        console.log(error);
        this.flashMessage.show(error.error.message, { cssClass: 'alert-danger'});
        this.loaderService.stopLoader();
      },
      () => {
        this.loaderService.stopLoader();
      }
    );
  }
}
