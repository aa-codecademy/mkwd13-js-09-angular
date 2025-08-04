import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-binding-example',
  imports: [FormsModule],
  templateUrl: './data-binding-example.html',
  styleUrl: './data-binding-example.css',
})
export class DataBindingExample {
  // Interpolation Binding (One-way binding)
  name = 'John Doe';
  age = 25;
  isActive = true;

  // Property Binding
  imageUrl = 'https://image-placeholder.com/images/actual-size/150x50.png';
  imageWidth = 150;
  imageHeight = 150;

  // Event Binding
  clickCount = 0;

  handleClick() {
    this.clickCount++;
    console.log(this.clickCount);
  }

  inputValue = '';

  handleInput(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  // Two way binding
  twoWayExample = '';
}
