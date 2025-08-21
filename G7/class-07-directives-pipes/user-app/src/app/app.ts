import { CommonModule } from '@angular/common';
import { Component, model, signal } from '@angular/core';
import { Header } from './core/components/header/header';
import { User } from './feature/users/models/user-model';
import { usersMock } from './feature/users/users-mock';
import { UserCard } from './feature/users/components/user-card/user-card';
import { FilterPipe } from './core/pipes/filter-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, UserCard, FilterPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // style = { backgroundColor: 'lightblue' };
  // dynamicClass = 'dynamicClass';
  users = signal<User[]>(usersMock);

  //'searchValue' is a reactive model for storing the search input value.
  // It is used with NgModel in the template for two-way data binding.
  // When you use [(ngModel)] in your template, any changes in the input field automatically update the searchValue property,
  // and any changes to the property update the input field.
  // This makes it easy to keep our UI and data in sync without writing extra event handling code.
  searchValue = model('');

  // Example of manual input handling below (KEYUP, CHANGE, etc.)
  // searchValue = signal('');
  // onInputChange(event: Event) {
  //   const target = event.target as HTMLInputElement;

  //   console.log(target.value);

  //   this.searchValue.set(target.value);
  // }
}
