import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, throwError } from 'rxjs';
import {
  CreateRecipeDto,
  Recipe,
  UpdateRecipeDto,
} from '../models/recipe.model';
import { DATA } from '../models/mock.data';
import { v4 as generateId } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  private recipesSubject = new BehaviorSubject<Recipe[]>(DATA);
  private recipes$ = this.recipesSubject.asObservable();

  getRecipes() {
    return this.recipes$;
  }

  getRecipeById(id: string): Observable<Recipe | undefined> {
    return this.recipes$.pipe(
      map((recipes) => recipes.find((r) => r.id === id))
    );
  }

  deleteRecipe(id: string): Observable<boolean> {
    const recipes = this.recipesSubject.value;
    const recipeExists = recipes.some((recipe) => recipe.id === id);

    if (!recipeExists) {
      return throwError(() => new Error(`Recipe with id: ${id} not found`));
    }

    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    this.recipesSubject.next(updatedRecipes);

    return of(true);
  }

  createRecipe(createRecipeDto: CreateRecipeDto): Observable<Recipe> {
    const newRecipe: Recipe = {
      ...createRecipeDto,
      id: generateId(),
      createdDate: new Date(),
      imageUrl:
        createRecipeDto.imageUrl ||
        'https://images.unsplash.com/vector-1738926381356-a78ac6592999?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };

    const currentRecipes = this.recipesSubject.value;
    this.recipesSubject.next([...currentRecipes, newRecipe]);

    return of(newRecipe);
  }

  updateRecipe(
    id: string,
    updateRecipeDto: UpdateRecipeDto
  ): Observable<boolean> {
    const currentRecipes = this.recipesSubject.value;

    const recipeExists = currentRecipes.some((recipe) => recipe.id === id);

    if (!recipeExists) return of(false);

    const updatedRecipes = currentRecipes.map((recipe) => {
      if (recipe.id !== id) return recipe;

      const {
        title,
        description,
        difficulty,
        ingredients,
        instructions,
        imageUrl,
      } = updateRecipeDto;
      const updatedRecipe: Recipe = {
        title,
        description,
        difficulty,
        ingredients,
        instructions,
        imageUrl,
        createdDate: recipe.createdDate,
        id: recipe.id,

        // same as above but shorter
        // ...recipe,
        // ...updateRecipeDto,
      };

      return updatedRecipe;
    });

    this.recipesSubject.next(updatedRecipes);

    return of(true);
  }
}
