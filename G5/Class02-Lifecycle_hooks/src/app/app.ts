import { Component } from '@angular/core';
import { ParentSignalComponent } from './components/signals/parent.component';
import { StandardParentComponent } from './components/standard/standard.component';

@Component({
  selector: 'app-root',
  providers: [],
  imports: [StandardParentComponent, ParentSignalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
