import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStore } from '../../store/auth.store';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  authService = inject(AuthService);
  authStore = inject(AuthStore);
  router = inject(Router);
  apiService = inject(ApiService);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  makeApiCall() {
    this.apiService.makeApiCall().subscribe((data) => {
      console.log(data);
    });
  }
}
