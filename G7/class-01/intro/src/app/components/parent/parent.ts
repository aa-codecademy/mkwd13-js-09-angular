import { Component } from '@angular/core';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent {
  titleFromParent = 'I AM COMING FROM THE PARENT!';
  infoFromChild = '';

  onInfoRecieve(event: string) {
    this.infoFromChild = event;
    console.log('EVENT RECIEVED FROM THE CHILD');
  }
}
