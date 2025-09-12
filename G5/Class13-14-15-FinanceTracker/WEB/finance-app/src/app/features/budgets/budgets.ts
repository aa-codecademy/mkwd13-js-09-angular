import { Component, inject } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { BudgetStore } from '../../core/stores/budget.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgets',
  imports: [CommonModule],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
})
export class Budgets {
  budgetSerice = inject(BudgetService);
  budgetStore = inject(BudgetStore);
  router = inject(Router);

  ngOnInit() {
    this.budgetSerice.getBudgets();
  }

  navigateToCreateBudget() {
    this.router.navigate(['/budgets/create']);
  }
}
