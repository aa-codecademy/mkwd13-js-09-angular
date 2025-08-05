import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {
  parentTitle = input<string>();
  infoOutput = output<string>();

  onInfoSend() {
    console.log('On Info send has been called.');
    this.infoOutput.emit('I AM THE INFO COMING FORM THE CHILD');
  }
}
