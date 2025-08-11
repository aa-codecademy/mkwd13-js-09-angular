import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignalsDemoComponent } from './components/signals-demo/signals-demo.component';
import { TodosComponent } from './components/todos/todos.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'signals', component: SignalsDemoComponent },
  { path: 'todos', component: TodosComponent },
];
