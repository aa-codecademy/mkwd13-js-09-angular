import { JsonPipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { Student } from '../../types/student';

@Component({
  selector: 'app-student-details',
  imports: [JsonPipe],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit, OnDestroy {
  student = signal<Student | null>(null);
  subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute, // info about the route we are on
    private location: Location, // info about the current location + to go back and forward within the visited locations
    private router: Router, // programmatically navigate though the application
    private studentService: StudentService
  ) {}

  ngOnInit() {
    // Without using the Observable
    // const studentId = this.route.snapshot.paramMap.get('id');
    // if (!studentId) {
    //   return;
    // }
    // const student = this.studentService.getStudentById(parseInt(studentId));
    // if (!student) {
    //   return;
    // }
    // this.student.set(student);
    // console.log(student);
    //
    // With using the observable
    this.subscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const studentId = params.get('id')!;

          return studentId;
        })
      )
      .subscribe((id) => {
        const student = this.studentService.getStudentById(parseInt(id))!;
        this.student.set(student);
      });
  }

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    console.log('Student Details unsubscribed');
    this.subscription.unsubscribe();
  }
}
