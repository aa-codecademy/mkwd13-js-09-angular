import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from "../../../../shared/components/button/button";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm = this.generateForm();

  generateForm() {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    console.log('Form has been submitted: ', this.registerForm.value);
  }
}
