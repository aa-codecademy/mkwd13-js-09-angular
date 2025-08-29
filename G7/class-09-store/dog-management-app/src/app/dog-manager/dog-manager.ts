import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DogStore } from '../store/dog.store';

@Component({
  selector: 'app-dog-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './dog-manager.html',
  styleUrl: './dog-manager.css',
})
export class DogManager {
  store = inject(DogStore);

  dogName: string = '';
  dogBreed: string = '';
  dogAge: number = 1;

  handleAddDog() {
    console.log('Adding dog...', this.dogName, this.dogBreed, this.dogAge);
    this.store.addDog(this.dogName, this.dogBreed, this.dogAge);
  }
}
