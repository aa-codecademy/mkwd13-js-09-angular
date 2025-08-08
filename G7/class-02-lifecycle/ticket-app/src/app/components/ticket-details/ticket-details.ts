import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  imports: [NgClass],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.scss',
})
export class TicketDetails implements OnInit, OnDestroy {
  selectedTicket = input<Ticket | null>(null);
  hideOutput = output();

  // [lifecycle-hook] called once after component initialization, used to fetch data, init signals etc.
  ngOnInit(): void {
    console.log('selected ticket: ', this.selectedTicket());
  }

  // [lifecycle-hook] called before component is removed.
  ngOnDestroy(): void {
    console.log('ticket-details was destroyed');
  }

  onCloseClick() {
    this.hideOutput.emit();
  }
}
