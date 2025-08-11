import { computed, Injectable, signal } from '@angular/core';
import { Movie } from '../../feature/movies/models/movie.model';
import { moviesMock } from '../../feature/movies/movies.mock';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies = signal<Movie[]>([]);
  selectedMovie = signal<Movie>(null);

  //Computed run when any of the signals referenced inside changes its value
  //Computed signals are read only
  totalLikes = computed(() =>
    this.movies().reduce((acc, el) => acc + el.likeCount, 0),
  );

  avgRating = computed(
    () =>
      this.movies().reduce((acc, el) => acc + el.rating, 0) /
      this.movies().length,
  );

  loadMovies() {
    this.movies.set(moviesMock);

    console.log(this.movies());
  }

  onMovieSelect(movie: Movie) {
    console.log('The selected movie is ', movie);
    this.selectedMovie.set(movie);
  }

  addLikeDislike(type: 'LIKE' | 'DISLIKE', movieId: number) {
    //Update works with a callback in which it accepts the previous value

    //We need to be explicit when updating state to avoid reference equality bugs
    this.selectedMovie.update((movie) => ({
      ...movie,
      likeCount: type === 'LIKE' ? movie.likeCount + 1 : movie.likeCount - 1,
    }));

    this.movies.update((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id !== movieId) return movie;

        if (type === 'LIKE') movie.likeCount = movie.likeCount + 1;
        if (type === 'DISLIKE') movie.likeCount = movie.likeCount - 1;

        return { ...movie };
      }),
    );
  }
}
