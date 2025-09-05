import { inject, Injectable, signal } from '@angular/core';
import { Movie } from '../../feature/movies/models/movie-model';
import { MOVIES_URL } from '../../feature/movies/movie-constants';
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
    fetch(`${MOVIES_URL}/${id}`)
      .then((res) => res.json())
      .then((value: Movie) => this.selectedMovie.set(value))
      .catch((err) => console.log(err));
  }

  // Sets the selected movie signal to the provided movie object
  movieSelect(movie: Movie) {
    this.selectedMovie.set(movie);
  }

  addLikeDislike(type: 'LIKE' | 'DISLIKE') {
    // The commented code below shows how you could update the signal locally
    // this.selectedMovie.update((prevMovie) => {
    //   const updatedMovie: Movie = {
    //     ...prevMovie,
    //     likeCount:
    //       type === 'LIKE'
    //         ? this.selectedMovie().likeCount + 1
    //         : this.selectedMovie().likeCount - 1,
    //   };

    //   return updatedMovie;
    // });

    // Create a new movie object with updated likeCount
    const reqMovie: Movie = {
      ...this.selectedMovie(),
      likeCount:
        type === 'LIKE'
          ? this.selectedMovie().likeCount + 1
          : this.selectedMovie().likeCount - 1,
    };

    // Send the updated movie to the backend using a PUT request
    fetch(`${MOVIES_URL}/${this.selectedMovie().id}`, {
      method: 'PUT',
      body: JSON.stringify(reqMovie),
    })
      .then((res) => res.json())
      .then((value) => this.selectedMovie.set(value));
  }
}
