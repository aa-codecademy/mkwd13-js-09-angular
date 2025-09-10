import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetService } from '../../core/services/budget.service';
import { CreateBudgetDto } from '../../core/models/budget.model';

@Component({
  selector: 'app-budget-form',
  imports: [ReactiveFormsModule],
  templateUrl: './budget-form.html',
  styleUrl: './budget-form.scss',
})
export class BudgetForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private budgetService = inject(BudgetService);

  createBudgetForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.createBudgetForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      totalAmount: [0, [Validators.required, Validators.min(1)]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.createBudgetForm.invalid) {
      this.createBudgetForm.markAllAsTouched();
      return;
    }

    const formData = this.createBudgetForm.value;

    console.log(formData);

    const createBudgetDto: CreateBudgetDto = {
      name: formData.name,
      totalAmount: formData.totalAmount,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
    };

    this.budgetService.createBudget(createBudgetDto);
    this.router.navigate(['/budgets']);
  }

  onCancel() {
    this.router.navigate(['/budgets']);
  }
}
