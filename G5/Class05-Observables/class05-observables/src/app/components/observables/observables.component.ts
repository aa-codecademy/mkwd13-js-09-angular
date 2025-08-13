import { Component } from '@angular/core';
import { Observable, of, filter, map } from 'rxjs';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent {
  // ** EXAMPLE 1 ** Simple Observable with 'of'
  fullName: Observable<string> = of('Bob Bobski');

  // ** EXAMPLE 2 **
  animals: Observable<string[]> = of(['Labrador', 'Fish', 'Dog', 'Cat']);

  // ** EXAMPLE 3 **
  moviesObservable: Observable<string[]>;

  // ** EXAMPLE 4 **
  numbersObservable: Observable<number> = of(1, 2, 3, 4, 5, 6);

  constructor() {
    // ** EXAMPLE 3 **
    this.moviesObservable = new Observable((observer) => {
      observer.next(['Lord of the rings', 'The Hobbit']);
      observer.next(['Harry Potter', 'John Wick']);

      setTimeout(() => {
        // observer.next(['Avengers', 'Spider-Man']);
      }, 3000);
    });
  }

  ngOnInit() {
    // ** EXAMPLE 1 **
    console.log(this.fullName); // logs the observable object

    // when we subscribe -> OBSERVERS
    this.fullName.subscribe((data) => {
      console.log('Recieved fullName: ', data);
    });

    //** EXAMPLE 2 **
    this.animals.subscribe((data) => {
      console.log('Animals list:', data);
    });

    // ** EXAMPLE 3 **
    this.moviesObservable.subscribe((data) => {
      console.log(data);
    });

    // ** EXAMPLE 4 **
    console.log('** EXAMPLE 4 **');
    this.numbersObservable.subscribe((data) => console.log(data));

    console.log('** EXAMPLE 4 using pipe and map');
    this.numbersObservable
      .pipe(
        // only with the pipe method we can use RXJS operators that change the data from the observable
        map((data) => {
          return data * 2;
        })
      )
      .subscribe((doubledNumbers) => console.log(doubledNumbers));
  }
}
