import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  counter = 0;

  logDetails(componentName: string) {
    this.counter = this.counter + 1;

    console.log(
      `The date is: ${new Date()}, the component is: ${componentName} and the counter is: ${
        this.counter
      }`
    );
  }
}
