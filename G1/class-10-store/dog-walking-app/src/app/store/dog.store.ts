import { Injectable } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Dog } from '../types/dog';

export interface DogState {
  dogs: Dog[];
}

const initialState: DogState = {
  dogs: [
    {
      id: 2,
      name: 'Blacky',
      breed: 'Rotweiler',
      createdAt: new Date(),
      age: 3,
      lastWalked: new Date(),
      walkCount: 2,
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class DogStore extends signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addDog(name: string, breed: string, age: number) {
      const newDog: Dog = {
        name,
        breed,
        age,
        id: Date.now(),
        createdAt: new Date(),
        lastWalked: undefined,
        walkCount: 0,
      };

      patchState(store, {
        dogs: [...store.dogs(), newDog],
      });
    },
    removeDog(id: number) {
      const updatedList = store.dogs().filter((dog) => dog.id !== id);
      patchState(store, { dogs: updatedList });
    },
    walkDog(id: number) {
      const dogs = store.dogs().map((dog: Dog) => {
        if (dog.id === id) {
          return {
            ...dog,
            lastWalked: new Date(),
            walkCount: dog.walkCount + 1,
          };
        }
        return dog;
      });

      patchState(store, {
        dogs,
      });
    },
  })),
) {
  constructor() {
    super();
  }
}
