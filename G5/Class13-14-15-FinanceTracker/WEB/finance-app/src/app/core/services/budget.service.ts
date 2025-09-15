import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Budget, BudgetApiResponse, CreateBudgetDto } from '../models/budget.model';
import { BudgetStore } from '../stores/budget.store';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly API_URL = 'http://localhost:3001';

  budgetStore = inject(BudgetStore);
  constructor(private http: HttpClient, private authService: AuthService) {}

  getBudgets() {
    this.budgetStore.setIsLoading(true);

    this.http.get<BudgetApiResponse[]>(`${this.API_URL}/budgets`).subscribe({
      next: (data) => {
        // Data from raw response => mapping into out domain type
        const budgets: Budget[] = data.map((budgetApiResponse) => Budget.create(budgetApiResponse));

        this.budgetStore.addBudgets(budgets);
      },
      error: (e) => {
        console.error(e);
        this.budgetStore.setError(e.error.message);
      },
    });
  }

  getBudget(budgetId: string) {
    this.http.get<BudgetApiResponse>(`${this.API_URL}/budgets/${budgetId}`).subscribe({
      next: (data) => {
        const budget = Budget.create(data);
        this.budgetStore.setSelectedBudget(budget);
      },
      error: (e) => {
        console.error(e);
        this.budgetStore.setSelectedBudget(null);
        this.budgetStore.setError(e.error.message);
      },
    });
  }

  createBudget(createBudgetDto: CreateBudgetDto) {
    this.budgetStore.setIsLoading(true);
    this.http.post<BudgetApiResponse>(`${this.API_URL}/budgets`, createBudgetDto).subscribe({
      next: (response) => {
        const newlyCreatedBudget = Budget.create(response);

        this.budgetStore.addBudget(newlyCreatedBudget);
      },

      error: (e) => {
        console.error(e);
        this.budgetStore.setError(e.error.message);
      },
    });
  }
}
