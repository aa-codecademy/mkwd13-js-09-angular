import { Component, input, output } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgClass, NgStyle],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  text = input<string>('');
  iconClass = input<string>('');
  style = input<{ [key: string]: string }>({});
  disabled = input(false);
  type = input<'button' | 'submit'>('button');

  btnClick = output();

  onBtnClick() {
    this.btnClick.emit();
  }
}
