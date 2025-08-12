import { Component, inject, OnInit } from '@angular/core';
import { Movies } from '../../../../core/services/movies';
import { MovieItem } from '../movie-item/movie-item';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  imports: [MovieItem],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList implements OnInit {
  private moviesService = inject(Movies);

  // This is a reference to the signal defined in the service.
  // It is not a new signal instance — it points to the original,
  // so any reads/writes will directly reflect on the service's signal.
  movies = this.moviesService.movies;

  ngOnInit(): void {
    this.moviesService.loadMovies();
  }

  onMovieSelect(movie: Movie) {
    this.moviesService.movieSelect(movie);
  }
}
