import { Component, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent {
  allRecipes = signal<Recipe[]>([]);

  constructor(private readonly recipeService: RecipeService) {}

  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.recipeService
        .getRecipes()
        .subscribe((data) => this.allRecipes.set(data))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  deleteRecipe(id: string) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe({
        next: (success) => {
          if (success) {
            console.info('Success delete');
          }
        },
        error: (err) => {
          // TODO: Handle error with better UX/UI
          console.error(`Error deleting recipe:`, err);
        },
      });
    }
  }
}
