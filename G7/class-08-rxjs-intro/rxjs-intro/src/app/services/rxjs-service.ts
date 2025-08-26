import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

const fruits = ['Apple', 'Pear', 'Orange', 'Grape', 'Banana'];

@Injectable({
  providedIn: 'root',
})
export class RxjsService {
  nameArray = ['Jack', 'Jill', 'Bob', 'Jon'];

  // Subject emits the latest array of names to its subscribers
  // Subjects do not hold a current value; they only emit when .next() is called.
  nameSubject$ = new Subject<string[]>();

  // BehaviorSubject holds the current value and emits it to the new subscribers immediately.
  fruitsSubject$ = new BehaviorSubject<string[]>(fruits);

  // Emits the current nameArray to all subscribers of nameSubject$.
  // We'll call this in a component's ngOnInit to emit the new value on nameSubject$ subject.
  getNames() {
    this.nameSubject$.next(this.nameArray);
  }

  // Adds a new name to the array and emits the updated array
  addName(newName: string) {
    this.nameArray.push(newName);
    this.nameSubject$.next(this.nameArray);

    // Alternative way
    // this.nameSubject$.next([...this.nameArray, newName]);
  }

  // Adds a new fruit to the BehaviorSubject's value and emits the updated array
  addFruit(newFruit: string) {
    this.fruitsSubject$.next([...this.fruitsSubject$.value, newFruit]);
  }
}
