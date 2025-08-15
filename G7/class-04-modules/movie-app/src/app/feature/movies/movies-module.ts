import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieList } from './components/movie-list/movie-list';
import { MoviesPage } from './movies-page/movies-page';
import { MovieItem } from './components/movie-item/movie-item';
import { MovieDetails } from './components/movie-details/movie-details';
import { Button } from "../../shared/components/button/button";

@NgModule({
  declarations: [MovieList, MoviesPage, MovieItem, MovieDetails],
  imports: [CommonModule, Button],
  //If a module that imports this module needs to use any of the components/directives that are declare here, they have to be exported first.
  exports: [MoviesPage],
})
export class MoviesModule {}
