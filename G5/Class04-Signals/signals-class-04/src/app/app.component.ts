import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SignalsDemoComponent } from './components/signals-demo/signals-demo.component';
import { TodosComponent } from './components/todos/todos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignalsDemoComponent, RouterLink, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'signals-class-04';

  titleFromParent = signal('Signal title');
}
