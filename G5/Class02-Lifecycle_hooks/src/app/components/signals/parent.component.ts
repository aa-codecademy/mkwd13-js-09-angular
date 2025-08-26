import { Component, effect, signal, untracked } from '@angular/core';
import { ChildSignalComponent } from './child.component';

@Component({
  selector: 'app-parent-signal',
  templateUrl: './parent.component.html',
  standalone: true,
  imports: [ChildSignalComponent],
})
export class ParentSignalComponent {
  counter = signal(0);
  name = signal('Choose your name...');
  showChild = signal(true);
  lastTimeOfClick = signal('');

  constructor() {
    effect(() => {
      this.#log(`Counter has changed to ${this.counter()}`);
    });

    effect(() => {
      this.#log(`Name has changed to ${this.name()}`);
    });

    effect(() => {
      // Log this only when name has changed
      const untrackedCounter = untracked(() => this.counter());

      this.#log(`${this.name()} is online, and counter is ${untrackedCounter}`);
    });
  }

  handleTimeChanged(newTime: string) {
    this.lastTimeOfClick.set(newTime);
  }

  chooseRandomName() {
    const names = [
      'John',
      'Marko',
      'Sharko',
      'Darko',
      'Kiril',
      'Martin',
      'Stefan',
    ];

    const random = Math.floor(Math.random() * names.length);
    const randomName = names[random];

    this.name.set(randomName);
  }

  handleChildVisibility() {
    this.showChild.update((prevVisibility) => !prevVisibility);
  }

  increment() {
    this.counter.update((count) => count + 1);
  }

  decrement() {
    this.counter.update((count) => count - 1);
  }

  #log(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    const logMsg = `[${timestamp}] Parent ${message}`;

    console.log(logMsg);
  }
}
