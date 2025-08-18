import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketsService } from '../../services/tickets.service';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css',
})
export class CreateTicketComponent {
  constructor(private readonly ticketService: TicketsService) {}

  possibleAssignees: string[] = [
    'John Doe',
    'Jane Doe',
    'Bob Bobski',
    'Steve Lee',
  ];

  title: string = '';
  description: string = '';
  assignee: string = this.possibleAssignees[0];

  clearInputs() {
    this.title = '';
    this.description = '';
    this.assignee = this.possibleAssignees[0];
  }

  // If we wanted to use event binding on the select with change event
  handleAssigneeChange(e: Event) {
    console.log(e);
    const eventTarget = e.target as HTMLSelectElement;
    const value = eventTarget.value;

    this.assignee = value;
    console.log(value);
  }

  handleSubmit() {
    console.log(this.title, this.assignee, this.description);
    // TODO: create the ticket
    this.ticketService.createTicket(
      this.title,
      this.description,
      this.assignee
    );
    this.clearInputs();

    // INVOKE INFO METHOD OF SNACKBAR SERVICE
  }
}
