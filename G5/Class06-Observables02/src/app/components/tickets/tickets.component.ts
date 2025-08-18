import { Component, computed, signal } from '@angular/core';
import { TicketComponent } from '../ticket/ticket.component';
import { Ticket } from '../../types/ticket.type';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-tickets',
  imports: [TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets = signal<Ticket[]>([]);
  hasTickets = computed(() => Boolean(this.tickets().length));

  // this.ticketService = new TicketService()
  constructor(private readonly ticketService: TicketsService) {}

  ngOnInit() {
    this.ticketService.tickets$.subscribe((data) => {
      console.log(data);

      this.tickets.set(data);
    });
  }
}
