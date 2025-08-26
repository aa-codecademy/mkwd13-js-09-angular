import { Component, signal } from '@angular/core';
import { Todo } from './types';
import { TODOS } from './data.const';
import { SingleTodoComponent } from '../single-todo/single-todo.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-todos',
  imports: [SingleTodoComponent, CreateTodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  todos = signal<Todo[]>(TODOS);

  handleConsumeTitleOutput(value: string) {
    console.log('I read the value from the output and it is:', value);
    const todo: Todo = {
      description: value,
      isDone: false,
      createdAt: new Date(),
      id: Date.now(),
    };

    this.todos.update((todos) => [...todos, todo]);
  }
}
