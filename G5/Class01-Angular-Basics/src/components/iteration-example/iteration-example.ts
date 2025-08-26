import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

type Student = {
  id: number;
  name: string;
  age: number;
  group: string;
  isActive: boolean;
};

@Component({
  selector: 'app-iteration-example',
  imports: [NgFor],
  templateUrl: './iteration-example.html',
  styleUrl: './iteration-example.css',
})
export class IterationExample {
  students: Student[] = [
    { id: 1, name: 'John Doe', age: 20, group: 'G1', isActive: true },
    { id: 2, name: 'Jane Doe', age: 30, group: 'G2', isActive: true },
    { id: 3, name: 'Jack Doe', age: 40, group: 'G3', isActive: false },
    { id: 4, name: 'Josh Doe', age: 50, group: 'G4', isActive: true },
  ];
}
