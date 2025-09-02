import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveForm {
  // Reactive forms are model-driven: the form is defined in TypeScript with FormGroup and FormControl.
  // The template just reflects that form model using formGroup and formControlName.
  // They’re great for complex and dynamic forms, but have more setup compared to template-driven forms.

  expenseForm = this.generateExpenseForm();

  private generateExpenseForm() {
    // FromGroup - the entire form.
    // FormControl - a single input/field.
    // First argument - initial value.
    // Second argument (optional) - validators. (e.g. required, minLength etc.)
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      amount: new FormControl(''),
      date: new FormControl('2025-08-09'),
      priority: new FormControl('medium'),
      comment: new FormControl(''),
      type: new FormControl('cash'),
    });
  }

  onFormSubmit() {
    console.log(this.expenseForm.value);
  }
}
