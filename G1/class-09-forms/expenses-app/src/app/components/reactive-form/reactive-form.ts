import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveForm {
  expenseForm = this.generateExpenseForm();

  paymentTypes: string[] = ['cash', 'credit'];

  maxCommentLength = 90;

  generateExpenseForm() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(500),
      ]),
      date: new FormControl('2025-09-01', Validators.required),
      priority: new FormControl('medium'),
      comment: new FormControl('', Validators.maxLength(this.maxCommentLength)),
      type: new FormControl('cash'),
    });
  }

  onFormSubmit() {
    console.log(this.expenseForm);

    console.log(this.expenseForm.value);
  }
}
