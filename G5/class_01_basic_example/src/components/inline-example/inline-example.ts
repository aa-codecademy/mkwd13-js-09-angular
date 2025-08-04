import { Component } from '@angular/core';

@Component({
  selector: 'app-inline-example',
  imports: [],
  standalone: true,
  template: `
    <div>
      <h3>Inline template & styles example</h3>
      <div>
        <h4>Counter: {{ counter }}</h4>
        <button (click)="increment()">Increment</button>
        <button (click)="decrement()">Decrement</button>
      </div>
    </div>
  `,
  styles: [
    `
      h3 {
        font-size: 30px;
        color: brown;
      }
    `,
  ],
})
export class InlineExample {
  counter = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }
}
