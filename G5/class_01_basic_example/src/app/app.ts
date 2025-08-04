import { Component } from '@angular/core';
import { ConditionalsExample } from '../components/conditionals-example/conditionals-example';
import { IterationExample } from '../components/iteration-example/iteration-example';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IterationExample, ConditionalsExample],
  templateUrl: './app.html',
})
export class App {}
