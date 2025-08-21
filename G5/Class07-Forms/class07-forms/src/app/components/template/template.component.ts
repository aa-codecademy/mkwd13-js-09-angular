import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  imports: [FormsModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  // Grabs the template reference variable #myForm (NgForm instance) after view init
  @ViewChild('myForm') myForm: NgForm;

  onHandleSubmit() {
    console.log('Submitted formReference', this.myForm);

    // All aggregated form values (object with each control's name/value)
    const formValues = this.myForm.value;

    // Template-driven validation state (invalid if any control invalid)
    const isFormInvalid = this.myForm.invalid;
    if (isFormInvalid) return; // Guard: stop if invalid

    console.log(formValues); // Could trigger API call / service method here
  }
}
