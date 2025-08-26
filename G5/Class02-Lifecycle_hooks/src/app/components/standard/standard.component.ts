import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StandardChildComponent } from './child.component';

@Component({
  selector: 'app-standard-parent',
  standalone: true,
  templateUrl: './standard.component.html',
  imports: [StandardChildComponent],
})
export class StandardParentComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    AfterViewInit,
    DoCheck,
    AfterContentChecked,
    AfterViewChecked
{
  counter = 0;
  showChild = true;

  // Important ones
  constructor() {
    // Initialization of the JavaScript class
    this.#log('constructor');
  }

  ngOnInit() {
    this.#log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.#log('ngOnChanges', changes);
  }

  ngAfterViewInit() {
    this.#log('ngAfterViewInit');
  }

  ngOnDestroy() {
    this.#log('ngOnDestroy');
  }

  // Nonimporatnt ones
  ngDoCheck() {
    this.#log('ngDoCheck');
  }

  ngAfterContentInit() {
    this.#log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    this.#log('ngAfterContentChecked');
  }

  ngAfterViewChecked() {
    this.#log('ngAfterVieChecked');
  }

  toggleChild() {
    this.showChild = !this.showChild;
    this.#log(`Child is now ${this.showChild ? 'visible' : 'hidden'}`);
  }

  increment() {
    this.counter++;
    this.#log(`Counter incremented ${this.counter}`);
  }

  decrement() {
    this.counter--;
    this.#log(`Counter decremented ${this.counter}`);
  }

  #log(message: string, data?: unknown) {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] Parent: ${message}`;

    console.log(logMessage, data);
  }
}
