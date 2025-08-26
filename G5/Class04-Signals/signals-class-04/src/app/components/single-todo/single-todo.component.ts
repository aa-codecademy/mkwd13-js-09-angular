import { Component, input } from '@angular/core';
import { Todo } from '../todos/types';

@Component({
  selector: 'app-single-todo',
  imports: [],
  templateUrl: './single-todo.component.html',
  styleUrl: './single-todo.component.css',
})
export class SingleTodoComponent {
  singleTodo = input.required<Todo>();
}
