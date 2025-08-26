import { Component, inject, model, OnInit, signal } from '@angular/core';
import { RxjsService } from '../../services/rxjs-service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-subjects',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './subjects.html',
  styleUrl: './subjects.scss',
})
export class Subjects implements OnInit {
  // Inject the RxjsService to access Subjects and BehaviorSubjects from that service
  private rxjsService = inject(RxjsService);

  // reference to fruitsSubject$ from the service
  fruitsSubject$ = this.rxjsService.fruitsSubject$;

  nameArr = signal<string[]>([]);

  // Models for input fields (Angular signals for two-way binding)
  nameValue = model<string>();
  fruitValue = model<string>();

  ngOnInit(): void {
    this.rxjsService.nameSubject$.subscribe((value) => {
      console.log(value);
      this.nameArr.set(value);
    });

    this.rxjsService.getNames();
  }

  onAddName() {
    if (!this.nameValue()) return;

    this.rxjsService.addName(this.nameValue());

    this.nameValue.set('');
  }

  onAddFruit() {
    if (!this.fruitValue()) return;

    this.rxjsService.addFruit(this.fruitValue());

    this.fruitValue.set('');
  }
}
