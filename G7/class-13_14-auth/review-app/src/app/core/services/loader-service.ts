import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  showLoader = signal(false);

  toggleLoader(show: boolean) {
    this.showLoader.set(show);
  }
}
