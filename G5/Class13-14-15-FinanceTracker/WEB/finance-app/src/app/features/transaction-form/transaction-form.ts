import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetStore } from '../../core/stores/budget.store';
import { TransactionService } from '../../core/services/transaction.service';
import { CreateTransactionDto } from '../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss',
})
export class TransactionForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private transactionService = inject(TransactionService);
  private budgetStore = inject(BudgetStore);

  budgetId = signal<string | null>(null);

  //form
  transactionFrom: FormGroup;

  ngOnInit() {
    this.initForm();

    const params = this.route.snapshot.params;
    const id = params['budgetId'];
    console.log(id);
    if (id) {
      this.budgetId.set(id);
    }
  }

  private initForm() {
    this.transactionFrom = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      amount: [0, [Validators.required, Validators.min(0.1)]],
      type: ['expense', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.transactionFrom.invalid) {
      this.transactionFrom.markAllAsTouched();
      return;
    }

    const id = this.budgetId();

    if (!id) return;

    const formValues = this.transactionFrom.value;

    console.log(formValues);

    const createTransactionDto: CreateTransactionDto = {
      title: formValues.title,
      description: formValues.description,
      type: formValues.type,
      date: formValues.date,
      amount: formValues.amount,
      budgetId: +id,
    };

    this.transactionService.create(createTransactionDto);
    this.router.navigate(['/budgets', this.budgetId()]);
  }

  onCancel() {
    this.router.navigate(['/budgets', this.budgetId()]);
  }
}
