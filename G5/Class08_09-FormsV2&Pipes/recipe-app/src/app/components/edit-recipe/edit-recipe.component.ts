import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateRecipeDto,
  Difficulty,
  Recipe,
  UpdateRecipeDto,
} from '../../models/recipe.model';
import { ingrediantValidator } from '../../validators/recipe.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss',
})
export class EditRecipeComponent {
  recipeForm: FormGroup;
  difficulties = Object.values(Difficulty);

  subscriptions: Subscription[] = [];

  constructor(
    private readonly router: Router,
    private readonly recipeService: RecipeService,
    private readonly activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();

    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
      this.loadRecipeForEdit(id);
    }
  }

  loadRecipeForEdit(id: string) {
    this.subscriptions.push(
      this.recipeService.getRecipeById(id).subscribe({
        next: (recipe) => {
          console.log('recipe to edit', recipe);

          if (recipe) {
            console.log('DEBUG: ', recipe);
            this.populateForm(recipe);
          }
        },
        error: (error) => {
          console.log('Cannot find recipe with id.', error);
        },
      })
    );
  }

  private populateForm(recipe: Recipe) {
    recipe.ingredients.forEach((ingredient) => {
      this.addIngrediant(ingredient);
    });

    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      instructions: recipe.instructions,
      difficulty: recipe.difficulty,
      imageUrl: recipe.imageUrl,
    });
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

  addIngrediant(ingredientValue = '') {
    // Using this formgroup we can create a new entity
    const ingrediantGroup = new FormGroup({
      ingrediant: new FormControl(ingredientValue, [ingrediantValidator]),
    });

    this.getIngrediants().push(ingrediantGroup);
  }

  removeIngrediant(index: number) {
    if (this.getIngrediants()) {
      this.getIngrediants().removeAt(index);
    }
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const formValues = this.recipeForm.value;

    const updatedRecipes: UpdateRecipeDto = {
      title: formValues.title,
      description: formValues.description,
      imageUrl: formValues.imageUrl,
      ingredients: formValues.ingrediants,
      instructions: formValues.instructions,
      difficulty: formValues.difficulty,
    };

    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (!id) return;

    this.subscriptions.push(
      this.recipeService.updateRecipe(id, updatedRecipes).subscribe({
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
