import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { UserArea } from './components/user-area/user-area';
import { AccessDenied } from './components/access-denied/access-denied';
import { authGuard } from './guards/auth.guard';
import { adminGuard, userGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }, // only if user is authenticated
  { path: 'login', component: Login },
  { path: 'admin-panel', component: AdminPanel, canActivate: [adminGuard] },
  { path: 'user-area', component: UserArea, canActivate: [userGuard] },
  { path: 'access-denied', component: AccessDenied },
  { path: '**', redirectTo: '/dashboard' },
];
