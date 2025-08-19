import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';
import { AddMovie } from './components/add-movie/add-movie';
import { MovieDetails } from './components/movie-details/movie-details';

const routes: Routes = [
  {
    path: '',
    component: MovieList,
  },
  {
    path: 'add',
    component: AddMovie,
  },
  {
    path: ':id',
    component: MovieDetails,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
