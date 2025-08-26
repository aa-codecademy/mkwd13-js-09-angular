import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
  },
  {
    // recipe/1
    path: 'recipe/:id',
    component: RecipeDetailComponent,
  },
  //   {
  //     path: 'add-recipe',
  //     component: AddRecipeComponent,
  //   },
  //   {
  //     path: 'edit-recipe/:id',
  //     component: EditRecipeComponent,
  //   },

  {
    path: 'add-recipe',
    loadComponent: () =>
      import('./components/add-recipe/add-recipe.component').then(
        (component) => component.AddRecipeComponent
      ),
  },
  {
    path: 'edit-recipe/:id',
    loadComponent: () =>
      import('./components/edit-recipe/edit-recipe.component').then(
        (component) => component.EditRecipeComponent
      ),
  },
];
