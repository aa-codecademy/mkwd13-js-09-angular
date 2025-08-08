import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../types/student';

@Component({
  selector: 'app-student-item',
  imports: [RouterLink],
  templateUrl: './student-item.html',
  styleUrl: './student-item.css',
})
export class StudentItem {
  student = input<Student | null>(null);
}
