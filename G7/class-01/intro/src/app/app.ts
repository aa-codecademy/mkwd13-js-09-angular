import { Component } from '@angular/core';
import { Parent } from './components/parent/parent';
import { Gallery } from "./components/gallery/gallery";

@Component({
  selector: 'app-root', // This is the selector we use when adding this component in other html files
  imports: [Parent, Gallery], // This is the imports array where we can add other components to be used here
  templateUrl: './app.html', // This is the url to the template (html file) for this component
  styleUrl: './app.scss', // This is the url to the styles (scss file) for this component
})
export class App {
  year = 2026;
  name = 'Viktor';

  person = {
    firstName: 'Viktor',
    lastName: 'C',
    age: 30,
    country: 'Macedonia',
  };

  backgroundColor = 'lightblue';
  title = 'in an Angular App';
  isDisabled = true;
  imgSrc =
    'https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png';

  isHeadingVisible = false;

  fruits = ['Apple', 'Banana', 'Cherry', 'Date'];

  cars = [
    { id: 1, brand: 'Mazda', model: '3', year: 2018 },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Focus',
      year: 2021,
    },
  ];

  course = 'ANGULAR';

  inputValue = '';

  printFullName(firstName: string, lastName: string) {
    console.log(`The person's full name is: ${firstName} ${lastName}`);
  }

  changeCourse(): void {
    this.course = this.course === 'ANGULAR' ? 'REACT' : 'ANGULAR';
  }

  onInputChange(event: KeyboardEvent) {
    console.log('Input change method called');

    const target = event.target as HTMLInputElement;

    this.inputValue = target.value;

    console.log(event);
  }
}
