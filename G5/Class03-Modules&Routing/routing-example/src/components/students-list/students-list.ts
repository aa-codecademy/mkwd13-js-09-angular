import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { Student } from '../../types/student';
import { StudentItem } from '../student-item/student-item';

@Component({
  selector: 'app-students-list',
  imports: [StudentItem, JsonPipe],
  providers: [StudentService],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css',
})
export class StudentsList implements OnInit, OnDestroy {
  students: Student[] = [];
  subscription: Subscription = new Subscription();

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.subscription = this.studentService.students$.subscribe((students) => {
      this.students = students;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
