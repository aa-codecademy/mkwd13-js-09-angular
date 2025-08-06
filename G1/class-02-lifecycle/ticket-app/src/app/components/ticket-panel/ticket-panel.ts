import { Component, input, signal } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { TicketBox } from '../ticket-box/ticket-box';
import { tick } from '@angular/core/testing';
import { TicketDetails } from '../ticket-details/ticket-details';

@Component({
  selector: 'app-ticket-panel',
  imports: [TicketBox, TicketDetails],
  templateUrl: './ticket-panel.html',
  styleUrl: './ticket-panel.scss',
})
export class TicketPanel {
  ticketList = input<Ticket[]>([]);

  isDetailsShown = signal(false);
  selectedTicket = signal<Ticket>(null);

  onTicketSelect(ticket: Ticket) {
    this.isDetailsShown.set(true);
    this.selectedTicket.set(ticket);
  }
}
