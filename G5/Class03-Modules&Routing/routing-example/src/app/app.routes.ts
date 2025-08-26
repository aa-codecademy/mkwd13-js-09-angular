import { Routes } from '@angular/router';
import { About } from '../components/about/about';
import { Contact } from '../components/contact/contact';
import { Home } from '../components/home/home';
import { StudentDetails } from '../components/student-details/student-details';
import { StudentsList } from '../components/students-list/students-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'students', component: StudentsList },
  { path: 'students/:id', component: StudentDetails },
  { path: 'contact', component: Contact },
];
