import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../types/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  #students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@mail.com',
      age: 20,
      group: 'G1',
    },
    {
      id: 2,
      name: 'Mike Doe',
      email: 'mike.doe@mail.com',
      age: 24,
      group: 'G2',
    },
    {
      id: 3,
      name: 'Jane Doe',
      email: 'jane.doe@mail.com',
      age: 29,
      group: 'G3',
    },
    {
      id: 4,
      name: 'Jack Doe',
      email: 'jack.doe@mail.com',
      age: 40,
      group: 'G4',
    },
  ];

  private _students = new BehaviorSubject<Student[]>(this.#students);

  public readonly students$: Observable<Student[]> =
    this._students.asObservable();

  getStudentById(id: number): Student | undefined {
    const students = this._students.getValue();

    return students.find((s) => s.id === id);
  }

  // getStudentById(id: number): Student | undefined {
  //   return this.#students.find((s) => s.id === id);
  // }
}
