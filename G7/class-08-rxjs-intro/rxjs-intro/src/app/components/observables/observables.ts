import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-observables',
  imports: [AsyncPipe],
  templateUrl: './observables.html',
  styleUrl: './observables.scss',
})
export class Observables implements OnInit, OnDestroy {
  numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // 'from' creates an observable that emits each array element *individually*, then completes
  // Here, it emits the array element for each number between 1 and 10
  fromObs$ = from(this.numArray);

  // 'of' creates an observable that emits each argument one by one.
  ofObs$ = of(this.numArray, 'dimitar', 100, false, { test: 'test' });

  // 'interval' creates an observable that emits an increasing number every X milliseconds
  intervalObs$ = interval(1000); // emits every 1 second

  // we will subscribe to this with *async* pipe
  intervalAsync$ = interval(500);

  // Used to store the subscription so we can unsubscribe later.
  intervalSubscription: Subscription;

  // Manual Observable example
  // You can use the Observable constructor to manually control what gets emitted
  // 'next' emits a value, 'error' emits an error and stops the observable, 'complete' ends it
  numberEmitterObs$ = new Observable((emitter) => {
    emitter.next(1);
    emitter.next(2);
    emitter.next(3);
    // emitter.complete(); // Uncomment to complete early
    emitter.next(4);
    emitter.next(5);
    emitter.error('something went wrong');
    emitter.next(6);
    emitter.next(7);
    emitter.next(8);
    emitter.next(9);
    emitter.next(10);
    emitter.complete();
  });

  ngOnInit(): void {
    // this.fromObs$.subscribe((value) => {
    //   console.log('from the fromObs$ subscription: ', value);
    // });

    // this.ofObs$.subscribe((value) => {
    //   console.log('from the ofObs$ subscription: ', value);
    // });

    this.numberEmitterObs$.subscribe({
      next: (value) => console.log('next value: ', value),
      error: (err) => console.log(err),
      complete: () => console.log('completed observable'),
    });

    // Subscribe to interval observable and log each emitted value
    // Save the subscription this.intervalSubscription to so we can unsubscribe later
    this.intervalSubscription = this.intervalObs$.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
