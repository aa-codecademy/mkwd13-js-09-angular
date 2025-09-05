import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-area',
  imports: [],
  templateUrl: './user-area.html',
  styleUrl: './user-area.scss',
})
export class UserArea {
  router = inject(Router);

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
