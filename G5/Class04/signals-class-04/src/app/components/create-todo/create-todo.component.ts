import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  imports: [FormsModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent {
  draftTodoDescription = '';

  todoTitleOutput = output<string>();

  createTodo() {
    console.log('On todo created');
    this.todoTitleOutput.emit(this.draftTodoDescription);
  }
}
