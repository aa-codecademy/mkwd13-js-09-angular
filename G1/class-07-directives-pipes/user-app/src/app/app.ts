import { Component, signal } from '@angular/core';
import { Header } from './core/components/header/header';
import { usersMock } from './feature/users/users-mock';
import { User } from './feature/users/models/user-model';
import { UserCard } from './feature/users/components/user-card/user-card';

@Component({
  selector: 'app-root',
  imports: [Header, UserCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  users = signal<User[]>(usersMock);
}
