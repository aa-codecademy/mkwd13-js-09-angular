import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dog-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './dog-manager.html',
  styleUrl: './dog-manager.css',
})
export class DogManager {
  dogName: string = '';
  dogBreed: string = '';
  dogAge: number = 1;

  handleAddDog() {
    console.log('Adding dog...', this.dogName, this.dogBreed, this.dogAge);
  }
}
