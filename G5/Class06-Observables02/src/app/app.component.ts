import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'class05-observables';
}
