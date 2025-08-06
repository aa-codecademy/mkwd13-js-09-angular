import { Component } from '@angular/core';
import { StandardParentComponent } from './components/standard/standard.component';

@Component({
  selector: 'app-root',
  imports: [StandardParentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
