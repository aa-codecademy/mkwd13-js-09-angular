import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-standard-child-component',
  standalone: true,
  templateUrl: './child.component.html',
})
export class StandardChildComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    AfterViewInit,
    DoCheck,
    AfterContentChecked,
    AfterViewChecked
{
  @Input() counter = 0;

  // Important ones
  constructor() {
    // Initialization of the JavaScript class
    this.#log('constructor');
  }

  ngOnInit() {
    this.#log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.#log('ngOnChanges', changes['counter']);
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
    this.#log('ngAfterViewChecked');
  }

  #log(message: string, data?: unknown) {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] Child: ${message}`;

    console.log(logMessage, data);
  }
}
