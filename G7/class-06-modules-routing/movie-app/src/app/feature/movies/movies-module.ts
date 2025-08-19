import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieList } from './components/movie-list/movie-list';
import { MovieDetails } from './components/movie-details/movie-details';
import { MovieItem } from './components/movie-item/movie-item';
import { AddMovie } from './components/add-movie/add-movie';
import { MoviesRoutingModule } from './movies-routing-module';

@NgModule({
  declarations: [MovieList, MovieDetails, MovieItem, AddMovie],
  imports: [CommonModule, MoviesRoutingModule],
})
export class MoviesModule {}
