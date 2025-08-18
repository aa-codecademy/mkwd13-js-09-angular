import { Injectable } from '@angular/core';
import { Ticket, TicketStatus } from '../types/ticket.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { SnackbarService } from './shared/snackbar.service';

const TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'Title 1',
    description: 'Description 1',
    assignee: 'Bob Bobski',
    createdAt: new Date(),
    status: TicketStatus.PENDING,
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'Description 2',
    assignee: 'John Doe',
    createdAt: new Date(),
    status: TicketStatus.DONE,
  },
  {
    id: '3',
    title: 'Title 3',
    description: 'Description 3',
    assignee: 'Jane Doe',
    createdAt: new Date(),
    status: TicketStatus.IN_DEVELOPMENT,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  // SUBJECTS ( BehaviorSubject, Subject, ReplaySubject)
  private _tickets = new BehaviorSubject(TICKETS);
  tickets$ = this._tickets.asObservable();

  constructor(private readonly snackbarService: SnackbarService) {}

  createTicket(title: string, description: string, assignee: string) {
    const newTicket: Ticket = {
      id: uuid(),
      title,
      description,
      assignee,
      createdAt: new Date(),
      status: TicketStatus.PENDING,
    };

    const tickets = this._tickets.value; // will consume the values of the subject up to that moment

    this._tickets.next([...tickets, newTicket]);

    this.snackbarService.setInfo({
      description: 'Ticket added',
      severity: 'success',
    });
  }

  removeTicket(id: string) {
    // getValue() => will consume the values of the subject up to that moment
    const tickets = this._tickets
      .getValue()
      .filter((ticket) => ticket.id !== id);

    this._tickets.next(tickets);

    this.snackbarService.setInfo({
      description: `Ticket removed, remaining tickets: ${tickets.length}`,
      severity: 'info',
    });
  }
}
