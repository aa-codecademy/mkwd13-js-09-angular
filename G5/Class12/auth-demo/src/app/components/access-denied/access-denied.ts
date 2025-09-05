import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  imports: [],
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.scss',
})
export class AccessDenied {
  router = inject(Router);

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
