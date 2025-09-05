import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/budgets', pathMatch: 'full' },
  // BUDGETS
  {
    path: 'budgets',
    loadComponent: () => import('./features/budgets/budgets').then((m) => m.Budgets),
    canActivate: [authGuard],
  },
  {
    path: 'budgets/create',
    loadComponent: () => import('./features/budget-form/budget-form').then((m) => m.BudgetForm),
    canActivate: [authGuard],
  },
  {
    path: 'budgets/edit/:id',
    loadComponent: () => import('./features/budget-form/budget-form').then((m) => m.BudgetForm),
    canActivate: [authGuard],
  },
  {
    path: 'budgets/:id',
    loadComponent: () =>
      import('./features/budget-details/budget-details').then((m) => m.BudgetDetails),
    canActivate: [authGuard],
  },
  //   TRANSACTIONS
  {
    path: 'budgets/:budgetId/transactions/create',
    loadComponent: () =>
      import('./features/transaction-form/transaction-form').then((m) => m.TransactionForm),
    canActivate: [authGuard],
  },
  {
    path: 'budgets/:budgetId/transactions/edit/:id',
    loadComponent: () =>
      import('./features/transaction-form/transaction-form').then((m) => m.TransactionForm),
    canActivate: [authGuard],
  },

  // AUTH
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  { path: '**', redirectTo: '/budgets' },
];
