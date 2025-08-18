import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SnackBarInfo = {
  description: string;
  severity: 'info' | 'warn' | 'error' | 'success';
};

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor() {}

  private _info = new BehaviorSubject<SnackBarInfo | null>(null);
  info$ = this._info.asObservable();

  setInfo(info: SnackBarInfo) {
    this._info.next(info);
  }
}
