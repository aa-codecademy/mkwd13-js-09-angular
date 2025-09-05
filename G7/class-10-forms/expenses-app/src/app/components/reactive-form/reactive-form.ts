import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

const blockedWords = ['money', 'casino', 'betting', 'expensive'];


@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveForm {
  // Reactive forms are model-driven: the form is defined in TypeScript with FormGroup and FormControl.
  // The template just reflects that form model using formGroup and formControlName.
  // They’re great for complex and dynamic forms, but have more setup compared to template-driven forms.

  expenseForm = this.generateExpenseForm();

  paymentTypes: string[] = ['cash', 'card'];

  commentMaxLength = 90;

  private generateExpenseForm() {
    // FromGroup - the entire form.
    // FormControl - a single input/field.
    // First argument - initial value.
    // Second argument (optional) - validators. (e.g. required, minLength etc.)
    return new FormGroup({
      // Nested FormGroup: grouping together related fields (basicData)
      basicData: new FormGroup({
        title: new FormControl('', [
          Validators.required,
          this.blockedWordsValidator,
        ]),
        amount: new FormControl(0, [
          Validators.required,
          Validators.min(1),
          Validators.max(500),
        ]),
        date: new FormControl('2025-08-09'),
      }),
      priority: new FormControl('medium'),
      comment: new FormControl('', Validators.maxLength(this.commentMaxLength)),
      type: new FormControl('cash'),
    });

    // Linear form ( without grouping )
    // return new FormGroup({
    //   title: new FormControl('', [Validators.required]),
    //   amount: new FormControl(0, [
    //     Validators.required,
    //     Validators.min(1),
    //     Validators.max(500),
    //   ]),
    //   date: new FormControl('2025-09-01', Validators.required),
    //   priority: new FormControl('medium'),
    //   comment: new FormControl(''),
    //   type: new FormControl('cash'),
    // });
  }

  onFormSubmit() {
    // Mark all form controls as "touched"
    // This makes Angular show validation errors for any emtpy/invalid fields.
    this.expenseForm.markAllAsTouched();

    if (this.expenseForm.invalid) return;

    console.log(this.expenseForm.value);
  }

  // When validator functions retrun null the value is valid, when they return an object value is invalid
  blockedWordsValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    console.log('custom validator fired');

    // This is an invalid case
    if (blockedWords.includes(control.value.toLowerCase()))
      return { blockedWord: true };

    // This is a valid case
    return null;
  }

  populateForm() {
    // Fill the form with new values (lke loading data from a backend api)

    this.expenseForm.setValue({
      basicData: {
        title: 'TEST',
        amount: 500,
        date: '2025-10-15',
      },
      comment: 'BACKEND COMMENT',
      priority: 'high',
      type: 'cash',
    });

    // Patch value is used if you want to update only certain fields (not the whole form).
    // this.expenseForm.patchValue({
    //   title: 'FROM PATCH VALUE',
    //   amount: '500',
    // });

    // Re-run all validations after updating the values.
    // This ensures the form's valid/invalid state is recalculated.
    this.expenseForm.updateValueAndValidity();
    console.log(this.expenseForm.valid);
  }
}
