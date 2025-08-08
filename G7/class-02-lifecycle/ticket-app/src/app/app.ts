import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, signal } from '@angular/core';
import { Ticket, TicketStatus } from './models/ticket.model';
import { TicketPanel } from './components/ticket-panel/ticket-panel';

@Component({
  selector: 'app-root',
  imports: [NgStyle, TicketPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, AfterViewInit {
  counter = signal<number>(0);
  randomColor = signal<string>('');
  randomTextColor = signal<string>('');

  ticketList: Ticket[] = [
    {
      id: 1,
      title: 'Mouse does not work',
      description: 'My mouse stopped working. Please help!',
      assignee: 'John',
      status: TicketStatus.NEW,
    },
    {
      id: 2,
      title: 'Monitor does not work',
      description: 'My monitor stopped working. Please help!',
      assignee: 'Jane',
      status: TicketStatus.NEW,
    },
    {
      id: 3,
      title: 'Keyboard does not work',
      description:
        'My keyboard stopped working, I spilled soda on it... Please help!',
      assignee: 'Ion',
      status: TicketStatus.IN_PROGRESS,
    },
    {
      id: 4,
      title: 'Car does not work',
      description: 'My car stopped working. Please help!',
      assignee: 'Jane',
      status: TicketStatus.IN_PROGRESS,
    },
    {
      id: 4,
      title: 'Computer does not work',
      description: 'My computer stopped working. Please help!',
      assignee: 'Jack',
      status: TicketStatus.DONE,
    },
  ];

  // used to create the component object.
  constructor() {
    console.log('constructor has been called');
  }

  // [lifecycle-hook] called once after component initialization, used to fetch data, init signals etc.
  ngOnInit(): void {
    console.log('on init has been called');
  }

  // [lifecycle-hook] called after the component's view is rendered
  ngAfterViewInit(): void {
    console.log('after view init has been called');
  }

  setCounter(value: number) {
    this.counter.set(value);
  }

  increment() {
    this.counter.update((count) => count + 1);
  }

  decrement() {
    this.counter.update((count) => count - 1);
  }

  generateRandomColor() {
    const randomColorHex = Math.floor(Math.random() * 16777215).toString(16);
    const randomTextColorHex = Math.floor(Math.random() * 16777215).toString(
      16
    );

    this.randomColor.set(`#${randomColorHex}`);
    this.randomTextColor.set(`#${randomTextColorHex}`);
  }
}
