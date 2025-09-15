import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BudgetService } from '../../core/services/budget.service';
import { BudgetStore } from '../../core/stores/budget.store';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-budget-details',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './budget-details.html',
  styleUrl: './budget-details.scss',
})
export class BudgetDetails {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private budgetService = inject(BudgetService);
  budgetStore = inject(BudgetStore);

  budgetId = signal<string | null>(null);
  selectedBudget = computed(() => this.budgetStore.selectedBudget());

  constructor() {
    // effect for this example might be useless, since no signal values are used in it
    effect(() => {
      this.route.params.subscribe((params) => {
        const id = params['id'];

        if (id) {
          // budgets/id => BUDGET + TRANSACTIONS

          this.budgetId.set(id);
          this.budgetService.getBudget(id);
        }
      });
    });

    effect(() => {
      const id = this.budgetId();
      const budget = this.selectedBudget();
      // What if there is no budget with that id?
      if (id && !budget) {
        // this.router.navigate(['/budgets']);
      }
    });
  }

  // SAME AS ABOVE
  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     const id = params['id'];
  //     console.log(id);
  //     if (id) {
  //       // budgets/id => BUDGET + TRANSACTIONS
  //       // TODO: Load the budget with this ID
  //     }
  //   });
  // }

  onAddTransaction() {
    const id = this.budgetId();

    if (id) {
      this.router.navigate(['/budgets', id, 'transactions', 'create']);
    }
  }
}
