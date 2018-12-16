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


@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerSignupComponent implements OnInit {
  private signupForm: FormGroup;

    constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router
    ) {
      this.signupForm = formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        accept: [0]
      });

      // this.signupForm.valueChanges.subscribe(value => console.log(value));
    }

    ngOnInit() {}

    onSubmit() {
      console.log(this.signupForm);
      const formValues = this.signupForm.value;

      const user = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password
      };

      this.authService
        .employerSignup(user)
        .subscribe(
          response => {
            return this.router.navigate(['/login']);
          },
          error => console.log(error)
        );
    }

}
