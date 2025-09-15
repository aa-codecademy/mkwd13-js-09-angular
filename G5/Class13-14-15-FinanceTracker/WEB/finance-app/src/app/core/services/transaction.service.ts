import { inject, Injectable } from '@angular/core';
import { BudgetStore } from '../stores/budget.store';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CreateTransactionDto } from '../models/transaction.model';
import { Transactions } from '../models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly API_URL = 'http://localhost:3001';
  private readonly BASE_URL = `${this.API_URL}/transactions`;

  private budgetStore = inject(BudgetStore);
  private router = inject(Router);
  private http = inject(HttpClient);

  create(createTransactionDto: CreateTransactionDto) {
    this.http.post<Transactions>(this.BASE_URL, createTransactionDto).subscribe({
      next: (data) => {
        // TODO: Implement is loading and error states
        console.log(data);
        this.budgetStore.addTransactionToBudget(data);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
