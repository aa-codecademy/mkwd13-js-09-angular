import { Routes } from '@angular/router';
import { Login } from './feature/auth/components/login/login';
import { Register } from './feature/auth/components/register/register';
import { Home } from './feature/home/home';
import { ReviewList } from './feature/reviews/review-list/review-list';
import { ReviewDetails } from './feature/reviews/review-details/review-details';
import { AddReview } from './feature/reviews/add-review/add-review';

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
  },
  {
    path: 'details/:id',
    component: ReviewDetails,
  },
  {
    path: 'add-review',
    component: AddReview,
  },
];
