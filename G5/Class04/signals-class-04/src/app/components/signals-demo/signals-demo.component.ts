import {
  Component,
  signal,
  computed,
  effect,
  Input,
  input,
} from '@angular/core';

@Component({
  selector: 'app-signals-demo',
  imports: [],
  templateUrl: './signals-demo.component.html',
  styleUrl: './signals-demo.component.css',
})
export class SignalsDemoComponent {
  // Traditional approach (zones);
  @Input({ required: true }) heading: string = '';

  // passing props from parent => child using input signals
  // uses new signal system approach to detect changes
  headingInputSingal = input.required();

  // Traditional field (uses zones *zone.js* to detect the changes)
  counter_traditional = 0;

  updateTraditionalCounter() {
    this.counter_traditional++;
  }

  // simple wrapper of a value
  counter = signal(0);
  multiplyBy = signal(0);

  // Computed signals derive data from another signals
  // they will re-initials if any signal values in their scope changs
  isEven = computed(() => this.counter() % 2 === 0);
  label = computed(() => {
    // do something else here, more complex logic
    return `Counter is: ${this.counter()} (${
      this.isEven() ? 'Counter is even' : 'Counter is odd'
    }) Multiply by is: ${this.multiplyBy()}`;
  });

  structureFromCounter = computed(() => {
    return {
      counter: this.counter(),
      label: `${this.multiplyBy() === 20 ? 'yes it is 20' : 'no it is not'} `,
    };
  });

  constructor() {
    effect(() => {
      const current = this.counter();

      console.log('[effect] counter changes', current);
    });

    effect(() => {
      const structure = this.structureFromCounter();

      console.log('[effect 2]', structure);
    });
  }

  increment() {
    this.counter.set(this.counter() + 1);
  }

  decrement() {
    // (counter) => the old value of the counter
    this.counter.update((counter) => {
      // do something else here, more complex logic
      const newCounter = counter - 1;
      return newCounter < 0 ? 100 : newCounter;
    });
  }
}
