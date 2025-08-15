import { Injectable, signal } from '@angular/core';
import { Movie } from '../../feature/movies/models/movie-model';
import { MOVIES_URL } from '../../feature/movies/movie-constants';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies = signal<Movie[]>([]);

  // Fetches all movies from the backend API and updates the movies signal
  getMovies() {
    fetch(MOVIES_URL)
      .then((res) => res.json())
      .then((value: Movie[]) => {
        console.log('this is the value from the get movies fetch: ', value);

        this.movies.set(value);
      })
      .catch((err) => console.log('Something went wrong:', err));
  }
}
