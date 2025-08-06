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

@Component({
  selector: 'app-standard-parent',
  standalone: true,
  templateUrl: './standard.component.html',
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

  #log(message: string, data?: unknown) {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] Parent: ${message}`;

    console.log(logMessage, data);
  }
}
