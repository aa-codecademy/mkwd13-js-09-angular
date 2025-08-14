import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../../feature/movies/models/movie-model';
import { moviesMock } from '../../feature/movies/movies-mock';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // BehaviorSubject is a special type that holds a current value and emits it to new subscribers.
  // If the value changes, all subscribers are notified automatically.
  // movies$ will hold the list of movies and allow components to reactively listen for changes
  movies$ = new BehaviorSubject<Movie[]>([]);
  // selectedMovie$ will hold the currently seelcted movie.
  selectedMovie$ = new BehaviorSubject<Movie>(null);

  loadMovies() {
    this.movies$.next(moviesMock); // .next() updates the current value and notifies subscribers.
  }

  onMovieSelect(movie: Movie) {
    this.selectedMovie$.next(movie);
  }
}
