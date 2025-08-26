import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-styles-example',
  imports: [NgClass],
  templateUrl: './styles-example.html',
  styleUrls: ['./styles-example.css', './cards-styles-example.css'],
})
export class StylesExample {
  bgColor = 'lightcoral';
  fontSize = '16px';
  border = '1px solid black';

  random = Math.round(Math.random() * 10);
}
