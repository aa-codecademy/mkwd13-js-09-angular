import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, Injectable } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Dog } from '../types/dog';

export interface DogState {
  dogs: Dog[];
  isLoading: boolean;
}

const initialState: DogState = {
  dogs: [
    // hardcoded values just used for testing purposes
    {
      id: 1,
      name: 'Boem',
      breed: 'Golden',
      age: 7,
      createdAt: new Date(),
      walkCount: 2,
      lastWalked: new Date(),
      feedCount: 3,
      lastFed: new Date(),
    },
    {
      id: 2,
      name: 'Hector',
      breed: 'Dogo Argentino',
      age: 2,
      createdAt: new Date(),
      walkCount: 5,
      lastWalked: new Date(),
      feedCount: 9,
      lastFed: new Date(),
    },
  ],
  isLoading: false,
};

@Injectable({
  providedIn: 'root',
})
export class DogStore extends signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('dogs'), // used to enable Redux Dev Tools
  withHooks({
    // when store is initialized
    onInit(state) {
      const stored = localStorage.getItem('dogs');

      if (stored) {
        try {
          const parsedDogs = JSON.parse(stored);
          patchState(state, {
            dogs: [...state.dogs(), ...parsedDogs],
          });
        } catch (err) {
          console.error('Error while parsing dogs data', err);
        }
      }
    },

    // when the store is destroyed
    onDestroy(state) {
      const stringifiedDogs = JSON.stringify(state.dogs());

      localStorage.setItem('dogs', stringifiedDogs);
    },
  }),
  withMethods((state) => ({
    addDog(name: string, breed: string, age: number) {
      console.log('Inside of the store method addDog', name, breed, age);
      const newDog: Dog = {
        id: Date.now(),
        name,
        breed,
        age,
        createdAt: new Date(),
        walkCount: 0,
        feedCount: 0,
      };
      console.log('new dog', newDog);

      patchState(state, {
        dogs: [...state.dogs(), newDog],
      });
    },
    removeDog(id: number) {
      const dogs = state.dogs().filter((dog) => dog.id !== id);

      patchState(state, {
        dogs,
      });
    },
    walkDog(id: number) {
      console.log(id);
      const dogs = state.dogs().map((dog) => {
        if (dog.id === id) {
          const updatedDog = {
            ...dog,
            walkCount: dog.walkCount + 1,
            lastWalked: new Date(),
          };
          return updatedDog;
        }

        return dog;
      });

      patchState(state, {
        dogs,
      });
    },
    feedDog(id: number) {
      const dogs = state.dogs().map((dog) => {
        if (dog.id === id) {
          const newDog: Dog = {
            ...dog,
            feedCount: dog.feedCount + 1,
            lastFed: new Date(),
          };
          return newDog;
        }

        return dog;
      });

      patchState(state, {
        dogs,
      });
    },
  })),
  withComputed((state) => ({
    totalDogs: computed(() => state.dogs().length),
    totalWalks: computed(() =>
      state.dogs().reduce((sum: number, dog: Dog) => {
        return sum + dog.walkCount;
      }, 0),
    ),
    totalFeedings: computed(() =>
      state.dogs().reduce((sum: number, dog: Dog) => {
        return sum + dog.feedCount;
      }, 0),
    ),
    mostWalkedDog: computed(
      () => state.dogs().sort((a, b) => b.walkCount - a.walkCount)[0],
    ),
  })),
) {
  constructor() {
    super();
  }
}

// [{"id":10,"name":"Galen","age":8,"breed":"Golden", "walkCount": 2}]
