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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        remember: [1, [Validators.required]]
      });

    }

    onSubmit() {
      console.log(this.loginForm);
      const login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService
        .login(login)
        .subscribe(
          response => {
            this.authService.loginSuccess(response);
            this.router.navigate(['/home']);
            console.log(response);
          },
          error => console.log(error)
        );
    }

}
