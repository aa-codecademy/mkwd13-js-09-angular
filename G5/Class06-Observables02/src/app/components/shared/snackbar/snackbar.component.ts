import { Component, effect, input, signal } from '@angular/core';
import { TicketsService } from '../../../services/tickets.service';
import {
  SnackBarInfo,
  SnackbarService,
} from '../../../services/shared/snackbar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css',
})
export class SnackbarComponent {
  info = signal<SnackBarInfo | null>(null);

  constructor(private readonly snackbarService: SnackbarService) {
    effect(() => {
      if (this.info()) {
        setTimeout(() => {
          this.info.set(null);
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.snackbarService.info$.subscribe((infoData) => {
      this.info.set(infoData);
    });
  }
}
