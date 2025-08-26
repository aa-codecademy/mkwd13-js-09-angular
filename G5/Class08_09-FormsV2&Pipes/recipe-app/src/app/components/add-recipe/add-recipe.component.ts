import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateRecipeDto, Difficulty } from '../../models/recipe.model';
import { ingrediantValidator } from '../../validators/recipe.validators';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss',
})
export class AddRecipeComponent {
  recipeForm: FormGroup;
  difficulties = Object.values(Difficulty);

  subscriptions: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private readonly recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.addIngrediant();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  navigateToHome() {
    this.router.navigate(['/']);
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
      ingrediant: new FormControl('', [ingrediantValidator]),
      // size: new FormControl(''),
    });

    this.getIngrediants().push(ingrediantGroup);
  }

  removeIngrediant(index: number) {
    if (this.getIngrediants().length) {
      this.getIngrediants().removeAt(index);
    }
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const formValues = this.recipeForm.value;

    const createRecipeDto: CreateRecipeDto = {
      title: formValues.title,
      description: formValues.description,
      imageUrl: formValues.imageUrl,
      ingredients: formValues.ingrediants,
      instructions: formValues.instructions,
      difficulty: formValues.difficulty,
    };

    this.subscriptions.push(
      this.recipeService.createRecipe(createRecipeDto).subscribe({
        next: (result) => {
          if (result) {
            this.navigateToHome();
          }
        },

        error: (error) => {
          console.log('Error:', error);
        },
      })
    );
  }

  getFieldError(fieldName: string): string | null {
    const control = this.recipeForm.get(fieldName); // title, description..

    // TODO: Validate on submit also
    if (control && control.errors && control.touched) {
      const { errors } = control;

      if (errors['required']) return `${fieldName} is required.`;
      if (errors['minlength'])
        return `${fieldName} must be at least ${errors['minlength'].requiredLength}.`;
      if (errors['maxlength'])
        return `${fieldName} must be up to ${errors['maxlength'].requiredLength}.`;
    }

    return null;
  }

  getIngredientError(index: number) {
    // this.getIngrediants().at(index) => unique form group
    // get('ingrediant') => consumes the control from the given form group

    const control = this.getIngrediants().at(index).get('ingrediant');

    if (control && control.errors && control.touched) {
      const { errors } = control;

      if (errors['required']) return errors['required'].message;
      if (errors['minLength']) return errors['minLength'].message;
    }

    return null;
  }
}
