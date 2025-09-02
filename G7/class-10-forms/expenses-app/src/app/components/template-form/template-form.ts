import { CommonModule } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './template-form.html',
  styleUrl: './template-form.scss',
})
export class TemplateForm implements OnInit {
  // Template-driven forms let you build forms mainly in the HTML template with Angular handling the logic.
  // They rely on FormsModule, ngModel, and Angular directives (e.g. "required").
  // Great for small and simple forms, but not as flexible for big apps/big and complex forms.

  // ViewChild lets you access a child component, directive or DOM element directly from the parent component's TypeScript class
  expenseForm = viewChild<NgForm>('expenseForm');

  paymentTypes: string[] = ['cash', 'card'];

  ngOnInit(): void {
    console.log(this.expenseForm());
    console.log(this.expenseForm()?.invalid);
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value);
  }
}
