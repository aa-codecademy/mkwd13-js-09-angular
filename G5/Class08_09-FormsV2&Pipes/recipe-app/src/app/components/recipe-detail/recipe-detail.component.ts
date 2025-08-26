import { Component, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent {
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);

  recipe = signal<Recipe>({} as Recipe);
  recipeObs: Observable<Recipe | undefined>;

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
      this.recipeService.getRecipeById(id).subscribe((data) => {
        if (data) {
          this.recipe.set(data);
        }
      });

      this.recipeObs = this.recipeService.getRecipeById(id);
    }
  }
}
