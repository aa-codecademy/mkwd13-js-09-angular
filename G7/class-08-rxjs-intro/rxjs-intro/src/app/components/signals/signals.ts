import { Component, effect, model, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, interval } from 'rxjs';

@Component({
  selector: 'app-signals',
  imports: [FormsModule],
  templateUrl: './signals.html',
  styleUrl: './signals.scss',
})
export class Signals implements OnInit {
  randomNum$ = new BehaviorSubject<number>(0);

  // Convert the BehaviorSubject to an Angular signal for reactive usage in the template.
  randomNum = toSignal(this.randomNum$);

  inputValue = model<string>();

  // Convert the inputValue signal to an observables to be able to use RxJS operators on it.
  inputValue$ = toObservable(this.inputValue);

  searchValue = signal('');

  interval$ = interval(1000);

  // Convert the interval obs to an Angular signal
  interval = toSignal(this.interval$);

  constructor() {
    // effect(() => {
    //   console.log('This is the interval value: ', this.interval());
    // });

    // effect(() => {
    //   const newNum = this.randomNum() * 10;
    //   console.log('THIS IS THE RANDOM NUM', newNum);
    // });
  }

  ngOnInit(): void {
    this.inputValue$.pipe(debounceTime(300)).subscribe((value) => {
      console.log('in the inputValue Sub');

      this.searchValue.set(value);
    });
  }

  onNumChange() {
    this.randomNum$.next(Math.random());
  }
}
