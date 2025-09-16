import { Routes } from '@angular/router';
import { Login } from './feature/auth/components/login/login';
import { Register } from './feature/auth/components/register/register';
import { Home } from './feature/home/home';
import { ReviewList } from './feature/reviews/review-list/review-list';
import { ReviewDetails } from './feature/reviews/review-details/review-details';
import { AddReview } from './feature/reviews/add-review/add-review';
import { authGuard } from './core/guards';
import { EditReview } from './feature/reviews/edit-review/edit-review';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'reviews',
    component: ReviewList,
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    component: ReviewDetails,
    canActivate: [authGuard],
  },
  {
    path: 'add-review',
    component: AddReview,
    canActivate: [authGuard],
  },
  {
    path: 'edit-review/:id',
    component: EditReview,
    canActivate: [authGuard],
  },
];
