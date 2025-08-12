import { Injectable, signal } from '@angular/core';
import { Movie } from '../../feature/movies/models/movie.model';
import { moviesMock } from '../../feature/movies/movies.mock';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  movies = signal<Movie[]>([]);

  selectedMovie = signal<Movie | null>(null);

  loadMovies() {
    this.movies.set(moviesMock);
  }

  movieSelect(movie: Movie) {
    console.log('movie select was called');
    this.selectedMovie.set(movie);
  }

  addLikeDislike(type: 'LIKE' | 'DISLIKE', movieId: number) {
    this.movies.update((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === movieId) {
          return {
            ...movie,
            likeCount:
              type === 'LIKE' ? movie.likeCount + 1 : movie.likeCount - 1,
          };
        }

        return movie;
      })
    );
  }

  // you can not access private method outside of this class (file)
  // private test() {
  //   console.log('test');
  // }
}
