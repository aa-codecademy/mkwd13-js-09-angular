import {
  Component,
  effect,
  input,
  OnInit,
  output,
  signal,
  untracked,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-rating-panel',
  imports: [NgClass],
  templateUrl: './rating-panel.html',
  styleUrl: './rating-panel.scss',
})
export class RatingPanel implements OnInit {
  // Each rating is represented as a tuple: [halfStar, fullStar]
  // Example: [0.5, 1], [1, 1.5], ... up to [9.5, 10]
  // This allows us to have half-star precision.
  ratings = signal<[number, number][]>(this.generateRatings());

  startingValue = input<number>(0);

  // signals for current and hover states
  currentValue = signal(this.startingValue());
  hoverValue = signal(this.startingValue());

  ratingOutput = output<number>();

  constructor() {
    effect(() => {
      const startingValue = this.startingValue();

      untracked(() => {
        this.currentValue.set(startingValue);
        this.hoverValue.set(startingValue);
      });
    });
  }

  ngOnInit(): void {
    if (this.startingValue()) this.currentValue.set(this.startingValue());

    this.generateRatings();
  }

  // Generate rating pairs for 0.5 increments up to 10
  generateRatings() {
    const result: [number, number][] = [];

    // e.g. i = 1, push [0.5, 1]; for i = 2, push [1.5, 2] etc.
    for (let i = 1; i <= 10; i++) {
      result.push([i - 0.5, i]);
    }

    return result;
  }

  onMouseEnter(rating: number) {
    this.hoverValue.set(rating);
  }

  onMouseLeave() {
    this.hoverValue.set(this.currentValue());
  }

  onClick(rating: number) {
    this.currentValue.set(rating);
    this.ratingOutput.emit(this.currentValue());
  }
}
