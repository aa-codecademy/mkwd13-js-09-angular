import { Component, effect, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-child-signal',
  templateUrl: './child.component.html',
})
export class ChildSignalComponent {
  counter = input(0);
  timeChanged = output<string>();

  constructor() {
    effect(() => {
      this.#log(`Counter value has changed to: ${this.counter()}`);
    });
  }

  onTimeChanged() {
    const timestamp = new Date().toLocaleTimeString();
    this.timeChanged.emit(timestamp);
  }

  #log(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logMsg = `[${timestamp}] Child ${message}`;

    console.log(logMsg);
  }
}
