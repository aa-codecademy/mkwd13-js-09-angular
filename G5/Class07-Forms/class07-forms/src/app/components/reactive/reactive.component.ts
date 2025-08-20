import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss',
})
export class ReactiveComponent {
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        phoneNumber: new FormControl('', Validators.required),
        email: new FormControl('', Validators.email),
        coverLetter: new FormControl(''),
        selectExample: new FormControl(''),
      },
      {
        updateOn: 'change', // changes when the validation triggers, default is change
      }
    );
  }

  onHandleSubmit() {
    console.log('Submit', this.myForm);

    const isInvalid = this.myForm.invalid;
    if (isInvalid) return;

    const formValues = this.myForm.value;
    console.log(formValues);

    // this.myForm.reset();
  }

  getErrorMessage(
    controlName: string,
    errorName: string,
    minLengthRequired = 0
  ) {
    const control = this.myForm.get(controlName);

    const hasError = control?.hasError(errorName) && control.touched;

    if (hasError) {
      switch (errorName) {
        case 'required':
          return `Enter: ${controlName}`;

        case 'minlength':
          return `Enter more then ${minLengthRequired} characters`;

        default:
          return null;
      }
    }

    return null;
  }
}
