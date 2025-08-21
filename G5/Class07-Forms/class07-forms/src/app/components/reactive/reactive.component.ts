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
  // Holds the root form state tree (group of controls)
  myForm: FormGroup;

  ngOnInit() {
    /**
     * Manually constructing a FormGroup.
     * Each FormControl: initial value + validators array.
     * (In larger apps you'd usually use FormBuilder for terser syntax.)
     */
    this.myForm = new FormGroup(
      {
        // firstName must be present & at least 5 chars
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        // lastName required, min 3 chars
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        // simple required field
        phoneNumber: new FormControl('', Validators.required),
        // email validator (not required, only format check if not empty)
        email: new FormControl('', Validators.email),
        // optional long text
        coverLetter: new FormControl(''),
        // select example, no validators
        selectExample: new FormControl(''),
      },
      {
        // Validation + valueChanges fire on each change (default); could be 'blur' or 'submit'
        updateOn: 'change',
      }
    );
  }

  onHandleSubmit() {
    console.log('Submit', this.myForm);

    // Guard clause: do nothing if invalid; template can also disable button
    const isInvalid = this.myForm.invalid;
    if (isInvalid) return;

    // Safe to read aggregated form value (all control values)
    const formValues = this.myForm.value;
    console.log(formValues);

    // Optionally reset to pristine state:
    // this.myForm.reset();
  }

  /**
   * Helper to centralize error message logic.
   * Only returns a string if the control has the target error AND was touched.
   */
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
