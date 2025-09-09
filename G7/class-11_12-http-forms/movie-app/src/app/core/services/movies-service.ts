import { inject, Injectable, signal } from '@angular/core';
import {
  Movie,
  ReviewFormValue,
} from '../../feature/movies/models/movie-model';
import { MoviesApiService } from './movies-api-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private router = inject(Router);
  private apiService = inject(MoviesApiService);

  movies = signal<Movie[]>([]);

  selectedMovie = signal<Movie | null>(null);

  // Fetches all movies from the backend API and updates the movies signal
  getMovies(sortBy?: 'rating' | 'likeCount') {
    this.apiService.fetchMovies(sortBy).subscribe({
      next: (value) => {
        console.log('This is the value from the get movies fetch', value);
        this.movies.set(value);
      },
      error: (err) => console.log(err),
    });
  }

  getMovieById(id: string) {
    // If a movie is already selected, avoid unnecessary backend calls
    if (this.selectedMovie()) return;

    // Fetch by movie ID (single movie)
    this.apiService.fetchMovieById(id).subscribe({
      next: (value) => this.selectedMovie.set(value),
      error: (err) => console.log(err),
    });
  }

  // Sets the selected movie signal to the provided movie object
  movieSelect(movie: Movie) {
    this.selectedMovie.set(movie);
  }

  createMovie(reqMovie: ReviewFormValue) {
    this.apiService.postMovie(reqMovie).subscribe({
      next: (createdMovie) => {
        console.log('returned value from creating a movie: ', createdMovie);
        this.router.navigate(['movies', createdMovie.id]);
      },
    });
  }

  updateMovie(id: string, reqMovie: Partial<Movie>) {
    this.apiService.patchMovie(id, reqMovie).subscribe({
      next: (updatedMovie) => {
        console.log(
          'This is the result of the patch operation: ',
          updatedMovie
        );

        this.selectedMovie.set(updatedMovie);
        this.router.navigate(['movies', updatedMovie.id]);
      },
    });
  }

  addLikeDislike(type: 'LIKE' | 'DISLIKE') {
    // Create a new movie object with updated likeCount
    const reqMovie: Movie = {
      ...this.selectedMovie(),
      likeCount:
        type === 'LIKE'
          ? this.selectedMovie().likeCount + 1
          : this.selectedMovie().likeCount - 1,
    };

    // Send the updated movie to the backend using a PUT request
    this.apiService.putMovie(this.selectedMovie().id, reqMovie).subscribe({
      next: (value) => {
        console.log(value);
        this.selectedMovie.set(value);
      },
      error: (err) => console.log(err),
    });
  }
}
