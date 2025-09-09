import { Routes } from '@angular/router';
import { Home } from './feature/home/home/home';
import { About } from './feature/about/about/about';
import { MovieList } from './feature/movies/components/movie-list/movie-list';
import { MovieDetails } from './feature/movies/components/movie-details/movie-details';
import { AddMovie } from './feature/movies/components/add-movie/add-movie';
import { NotFound } from './core/components/not-found/not-found';
import { EditMovie } from './feature/movies/components/edit-movie/edit-movie';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'about',
    component: About,
  },
  // {
  //   path: 'movies',
  //   component: MovieList,
  // },
  {
    path: 'movies',
    loadComponent: () =>
      // The import must be a correct path to the ts file
      import('./feature/movies/components/movie-list/movie-list').then(
        // The callback here needs to return the component class declaration
        (c) => c.MovieList
      ),
  },
  {
    // we define a route parameter by adding : and the parameter name
    path: 'movies/:id',
    component: MovieDetails,
  },
  {
    path: 'add-movie',
    component: AddMovie,
  },
  {
    path: 'edit-movie/:id',
    component: EditMovie,
  },
  {
    // "**" means catch all routes that weren't matched above
    path: '**',
    component: NotFound,
  },
];
