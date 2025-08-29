import { Component } from '@angular/core';
import { DogManager } from './dog-manager/dog-manager';
import { Stats } from './stats/stats';

@Component({
  selector: 'app-root',
  imports: [DogManager, Stats],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentView: 'manager' | 'stats' = 'manager';
}
