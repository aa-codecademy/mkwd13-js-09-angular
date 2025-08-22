import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Difficulty } from '../../models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent {
  recipeForm: FormGroup;
  difficulties = Object.values(Difficulty);

  ngOnInit() {
    this.initializeForm();
    this.addIngrediant();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ]),
      instructions: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      ingrediants: new FormArray([]),
      difficulty: new FormControl(Difficulty.EASY, [Validators.required]),
      imageUrl: new FormControl(''),
    });
  }

  getIngrediants(): FormArray {
    return this.recipeForm.get('ingrediants') as FormArray;
  }

  addIngrediant() {
    // Using this formgroup we can create a new entity
    const ingrediantGroup = new FormGroup({
      ingrediant: new FormControl(''),
      size: new FormControl(''),
    });

    this.getIngrediants().push(ingrediantGroup);
  }

  onSubmit() {
    if (this.recipeForm.invalid) return;

    const formValues = this.recipeForm.value;

    console.log(formValues);
  }
}
