import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-conditionals-example',
  imports: [NgIf, CommonModule],
  templateUrl: './conditionals-example.html',
  styleUrl: './conditionals-example.css',
})
export class ConditionalsExample {
  random = Math.round(Math.random() * 100);

  color = '';

  handleChangeColor(newColor: string) {
    this.color = newColor;
  }
}
