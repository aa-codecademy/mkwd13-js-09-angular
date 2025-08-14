import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies-service';
import { Movie } from '../../models/movie-model';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList implements OnInit {
  // Inject the MoviesService so we can access movie data and logic.
  private moviesService = inject(MoviesService);

  // movies will hold the list of movies to display.
  movies: Movie[] = [];

  ngOnInit(): void {
    // Subscribe to moviesService.movies$ to get updates whenever the movie list changes.
    this.moviesService.movies$.subscribe((value) => {
      console.log('EVENT EMITTED');
      console.log(value);

      // Update the movies property with the latest list of movies (latest value)
      this.movies = value;
    });

    // Load the initial list of movies from the service method.
    this.moviesService.loadMovies();
  }

  onMovieClick(movie: Movie) {
    console.log('on movie clicked: ', movie);
    this.moviesService.onMovieSelect(movie);
  }
}
