import {
  Component,
  DestroyRef,
  inject,
  model,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RxjsService } from '../../services/rxjs-service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-subjects',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './subjects.html',
  styleUrl: './subjects.scss',
})
export class Subjects implements OnInit, OnDestroy {
  // Inject the RxjsService to access Subjects and BehaviorSubjects from that service
  private rxjsService = inject(RxjsService);

  // Used for automatic cleanup of subscriptions when the component is destroyed
  private destroyRef = inject(DestroyRef);

  // reference to fruitsSubject$ from the service
  fruitsSubject$ = this.rxjsService.fruitsSubject$;

  nameArr = signal<string[]>([]);

  // Models for input fields (Angular signals for two-way binding)
  nameValue = model<string>();
  fruitValue = model<string>();

  unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.rxjsService.nameSubject$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        console.log('TAKE UNTIL SUBSCRIPTION');
        this.nameArr.set(value);
      });

    this.rxjsService.nameSubject$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log('TAKE UNTIL DESTROYED SUBSCRIPTION');
        this.nameArr.set(value);
      });

    this.rxjsService.getNames();
  }

  ngOnDestroy(): void {
    // Manually trigger unsubscription for "takeUntil"
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
