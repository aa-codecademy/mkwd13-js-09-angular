import {
  Component,
  Input,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Ticket, TicketStatus } from '../../models/ticket.model';
import { TicketBox } from '../ticket-box/ticket-box';
import { TicketDetails } from '../ticket-details/ticket-details';

@Component({
  selector: 'app-ticket-panel',
  imports: [TicketBox, TicketDetails],
  templateUrl: './ticket-panel.html',
  styleUrl: './ticket-panel.scss',
})
export class TicketPanel implements OnChanges {
  readonly ticketStatus = TicketStatus;

  ticketList = input<Ticket[]>([]);
  filteredTickets = signal<Ticket[]>([]);
  selectedTicket = signal<Ticket | null>(null);
  isDetailsShown = signal(false);

  // decorator based input (classic input scenario)
  @Input() myInput = 'default value';

  constructor() {
    console.log('ticketList from constructor: ', this.ticketList());
  }

  // [lifecycle-hook] called once after component initialization, used to fetch data, init signals etc.
  ngOnInit(): void {
    console.log('ticketList in ngOnInit: ', this.ticketList());

    this.filteredTickets.set(this.ticketList());
  }

  // [lifecycle-hook] called when @Input() values change (more useful in classic input scenarios)
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ng on changes called: ', changes);
  }

  filterTicketsByStatus(status: TicketStatus) {
    this.filteredTickets.set(
      this.ticketList().filter((ticket) => ticket.status === status)
    );
  }

  onTicketSelect(ticket: Ticket) {
    this.selectedTicket.set(ticket);
    this.isDetailsShown.set(true);
    console.log(this.selectedTicket());
  }
}
