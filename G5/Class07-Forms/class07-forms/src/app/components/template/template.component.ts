import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  imports: [FormsModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  @ViewChild('myForm') myForm: NgForm;

  onHandleSubmit() {
    console.log('Submitted formReference', this.myForm);

    const formValues = this.myForm.value;

    const isFormInvalid = this.myForm.invalid;
    if (isFormInvalid) return;

    console.log(formValues); // make api request using this values
  }
}
