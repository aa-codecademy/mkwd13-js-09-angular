import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, throwError } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { DATA } from '../models/mock.data';

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
}
