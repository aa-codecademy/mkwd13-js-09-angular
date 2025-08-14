import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  // The base signal that the computed() depends on
  // count = signal(0);

  // Computed signal - depends on count
  // doubleCount = computed(() => this.count() * 2);

  // increment() {
  //   this.count.update((prevCount) => prevCount + 1);
  // }
}
