import { Component, signal } from '@angular/core';
import { Observable, of, filter, map, interval, Subscription } from 'rxjs';

interface Subject {
  id: number;
  name: string;
  numberOfClasses: number;
}
interface FoodOrder {
  id: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'DELIVERED';
}

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent {
  // ** EXAMPLE 1 **
  subjectObservable: Observable<Subject>;

  // ** EXAMPLE 2 **
  foodOrder: Observable<FoodOrder>;

  hasError = signal(false);

  // ** EXAMPLE 3 **
  intervalObservable = interval(1000);
  intervalObservableSubscription: Subscription;

  // ** EXAMPLE 4 - HANDLING MULTIPLE SUBSCRIPTIONS **
  subscriptions: Subscription[] = [];

  constructor() {
    // ** EXAMPLE 1 **
    this.subjectObservable = new Observable((observer) => {
      observer.next({ id: 1, name: 'Angular', numberOfClasses: 15 });
      observer.next({ id: 2, name: 'React', numberOfClasses: 10 });

      observer.complete(); // completed the observable
      observer.next({ id: 3, name: 'NestJS', numberOfClasses: 15 }); // will never reach this because the observable completed
    });

    // ** EXAMPLE 2 **
    this.foodOrder = new Observable((observable) => {
      observable.next({ id: 1, status: 'PENDING' });
      observable.next({ id: 1, status: 'IN_PROGRESS' });

      setTimeout(() => {
        observable.error('ERROR HAPPENED DURING THE ORDER, PLEASE CHECK LATER');
        observable.next({ id: 2, status: 'PENDING' });
      }, 3000);
      observable.next({ id: 1, status: 'DELIVERED' }); // will never reach this because there was error previously
    });
  }

  ngOnInit() {
    // ** EXAMPLE 1 - READING DATA #1 **
    const subscriptionOne = this.subjectObservable.subscribe(
      // 1st CALLBACK => reads the data
      (data) => {
        console.log(data);
      },
      // 2nd callback => handles error
      (reason) => {
        console.log(`Error happened ${reason}`);
      },
      // 3rd callback => handles complete
      () => {
        console.log(`Complete has been invoked, approach 1.`);
      }
    );

    console.log('_________');
    // ** EXAMPLE 1 - READING DATA #2 **
    const subscriptionTwo = this.subjectObservable.subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('Complete has been invoked.');
      },
      error: (err) => {
        console.log(`Error happened ${err}`);
      },
    });

    console.log('_________ EXAMPLE 2 _________');
    // ** EXAMPLE 2 **
    const subscriptionThree = this.foodOrder.subscribe({
      next: (data) => {
        console.log(`Order is: `, data);
      },
      error: (error) => {
        console.log(`Error happened in observable: ${error}`);
        this.hasError.set(true);
      },
    });

    this.subscriptions.push(
      this.foodOrder.subscribe({
        next: (data) => {
          console.log(`Order is: `, data);
        },
        error: (error) => {
          console.log(`Error happened in observable: ${error}`);
          this.hasError.set(true);
        },
      })
    );

    console.log('_________ EXAMPLE 3 _________');
    // ** EXAMPLE 3 **
    this.intervalObservableSubscription = this.intervalObservable.subscribe({
      next: (data) => {
        console.log('Interval is running: ', data);
      },
    });

    // ** EXAMPLE 4 **
    this.subscriptions.push(
      subscriptionOne,
      subscriptionTwo,
      subscriptionThree
    );
  }

  ngOnDestroy() {
    console.log('OnDestroy invoked!!!');
    this.intervalObservableSubscription.unsubscribe();

    // EXAMPLE 4 => UNSUBSCRIBE ON ALL SUBSCRIPTIONS
    this.subscriptions.forEach((subscription) => {
      console.log(subscription);
      subscription.unsubscribe();
    });
  }
}
