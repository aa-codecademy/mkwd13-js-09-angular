import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { PaginationOutput } from '../../shared.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  totalCount = input.required<number>();
  paginationOutput = output<PaginationOutput>();

  constructor() {
    // effect: runs reactively when any signals used inside it change
    // Here, it runs once when component is created.
    effect(
      () => {
        // Reset current page to 1 every time effect triggers
        this.currentPage.set(1);

        // Emit initial pagination output to parent
        // telling it "start at first result, fetch itemsPerPage amount"
        this.paginationOutput.emit({
          firstResult: 1,
          maxResults: this.itemsPerPage(),
        });
      },
      {
        allowSignalWrites: true, // allow us to update signals inside effect
      },
    );
  }

  currentPage = signal(1); // stores current page number (default: 1)
  itemsPerPage = model<number>(10); // two-way bindable signal (default: 10 items/page)
  maxPages = computed(() => Math.ceil(this.totalCount() / this.itemsPerPage())); // computed(): calculates max pages based on totalCount and itemsPerPage

  onChangePage(direction: 'next' | 'prev') {
    // Update page number
    if (direction === 'next') this.currentPage.update((prev) => prev + 1);
    if (direction === 'prev') this.currentPage.update((prev) => prev - 1);

    // Emit new pagination info to parent
    // Example: page 2, 10 items per page → firstResult = 11, maxResults = 10
    this.paginationOutput.emit({
      firstResult: (this.currentPage() - 1) * this.itemsPerPage() + 1,
      maxResults: this.itemsPerPage(),
    });
  }
}
