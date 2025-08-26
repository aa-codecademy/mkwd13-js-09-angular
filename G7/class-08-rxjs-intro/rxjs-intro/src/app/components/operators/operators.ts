import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { filter, from, map, of, skip, take, takeLast, tap } from 'rxjs';

@Component({
  selector: 'app-operators',
  imports: [AsyncPipe],
  templateUrl: './operators.html',
  styleUrl: './operators.scss',
})
export class Operators implements OnInit {
  usernames = [
    'Dimitar',
    'Tina',
    'Viktor',
    'Vebi',
    'Flamur',
    'Nikola',
    'Dogancan',
  ];

  // 'of' operator creates an observable that emits the whole array as a single value
  // 'map' operator transforms each useranme to uppercase
  usernamesOfObs$ = of(this.usernames).pipe(
    map((value) => value.map((element) => element.toUpperCase()))
  );

  // 'from' operator creates an observable that emits each username one by one
  usernamesFromObs$ = from(this.usernames);

  ngOnInit(): void {
    this.usernamesOfObs$.subscribe((value) => console.log(value));

    // this.usernamesFromObs$
    //   .pipe(
    //     map((value) => {
    //       console.log(value);

    //       return value.toLowerCase();
    //     }),
    //     tap((value) => {
    //       console.log(value);
    //     })
    //   )
    //   .subscribe((value) => console.log(value));

    // Filter: only users that start with 'V'
    // Map: append ' V' to each filtered username
    // this.usernamesFromObs$
    //   .pipe(
    //     filter((value) => value.startsWith('V')),
    //     map((value) => value + ' V')
    //   )
    //   .subscribe((value) => console.log(value));

    // Skips 2 emissions and takes the next 3 emissions
    // this.usernamesFromObs$
    //   .pipe(skip(2), take(3))
    //   .subscribe((value) => console.log(value));

    // Takes last 3 emissions
    this.usernamesFromObs$
      .pipe(takeLast(3))
      .subscribe((value) => console.log(value));
  }
}
