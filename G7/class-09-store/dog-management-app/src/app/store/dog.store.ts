import { Injectable } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { Dog } from '../types/dog';

export interface DogState {
  dogs: Dog[];
}

const initialState: DogState = {
  dogs: [],
};

@Injectable({
  providedIn: 'root',
})
export class DogStore extends signalStore(
  { providedIn: 'root' },
  withState(initialState)
) {
  constructor() {
    super();
  }
}
