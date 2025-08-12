import { NgClass, NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgStyle, NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  text = input<string>();
  disabled = input<boolean>(false);
  style = input<{ [key: string]: string }>({});
  iconClass = input<string>();
  type = input<'button' | 'submit'>('button');
  btnClick = output();

  onBtnClick() {
    this.btnClick.emit();
  }
}
