import { Component, input } from '@angular/core';
import { Ticket } from '../../types/ticket.type';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket = input.required<Ticket>();
}
