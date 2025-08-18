import { Component, input } from '@angular/core';
import { Ticket } from '../../types/ticket.type';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket = input.required<Ticket>();

  constructor(private readonly ticketService: TicketsService) {}

  handleRemove() {
    this.ticketService.removeTicket(this.ticket().id);

    // HERE ALSO INVOKE THE SNACKBAR SERVICE
  }
}
