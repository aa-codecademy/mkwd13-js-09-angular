import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { Budget, Transactions } from '../models/budget.model';
import { computed } from '@angular/core';

interface BudgetState {
  budgets: Budget[];
  selectedBudget: Budget | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BudgetState = {
  budgets: [],
  selectedBudget: null,
  isLoading: false,
  error: null,
};

export const BudgetStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store) => ({
    addBudgets: (budgets: Budget[]) => {
      patchState(store, { budgets, error: null, isLoading: false });
    },

    addBudget: (budget: Budget) => {
      patchState(store, { budgets: [...store.budgets(), budget], error: null, isLoading: false });
    },

    setIsLoading: (isLoading: boolean) => {
      patchState(store, { isLoading });
    },

    clearError: () => {
      patchState(store, { error: null });
    },

    setError: (error: string | null) => {
      patchState(store, { error, isLoading: false });
    },

    setSelectedBudget: (budget: Budget | null) => {
      patchState(store, { selectedBudget: budget });
    },

    addTransactionToBudget: (transaction: Transactions) => {
      const currentSelectedBudget = store.selectedBudget();

      if (!currentSelectedBudget) return;

      currentSelectedBudget.addTransaction(transaction);

      const updatedBudgets = store
        .budgets()
        .map((budget) =>
          budget.id() === currentSelectedBudget.id() ? currentSelectedBudget : budget
        );

      patchState(store, { budgets: updatedBudgets });
    },
  })),
  withComputed((store) => ({
    // Computed selectors
    activeBudgets: computed(() => {
      const now = new Date();

      return store
        .budgets()
        .filter((budget) => new Date(budget.fromDate()) <= now && new Date(budget.toDate()) >= now);
    }),
  }))
);
