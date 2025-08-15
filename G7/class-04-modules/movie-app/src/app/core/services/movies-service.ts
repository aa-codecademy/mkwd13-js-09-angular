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

  addLikeDislike(type: 'LIKE' | 'DISLIKE') {
    console.log(this.movies$.getValue()); // Logs the current list of movies (useful for debugging);

    // Update the selected movie's likeCount

    this.selectedMovie$.next({
      ...this.selectedMovie$.getValue(), // Spread operator copies all properties of the selected movie
      likeCount:
        type === 'LIKE'
          ? this.selectedMovie$.getValue().likeCount + 1
          : this.selectedMovie$.getValue().likeCount - 1,
    });

    // Update the movies list with the new likeCount for the selected movie.
    this.movies$.next(
      this.movies$.getValue().map((movie) => {
        // Only update the movie that maches the selected movie's id.
        if (movie.id !== this.selectedMovie$.getValue().id) return movie;

        // Inecrement or decrement the likeCount based on the type.
        if (type === 'LIKE') movie.likeCount += 1;
        if (type === 'DISLIKE') movie.likeCount -= 1;

        // Return a new object to ensure immutability.
        return { ...movie };
      })
    );
  }
}
