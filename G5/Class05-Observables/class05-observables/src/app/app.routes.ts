import { Routes } from '@angular/router';
import { ObservablesComponent } from './components/observables/observables.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

export const routes: Routes = [
  { path: '', component: ObservablesComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'create-ticket', component: CreateTicketComponent },
];
