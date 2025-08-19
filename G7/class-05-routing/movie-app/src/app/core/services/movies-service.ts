import { Injectable, signal } from '@angular/core';
import { Movie } from '../../feature/movies/models/movie-model';
import { MOVIES_URL } from '../../feature/movies/movie-constants';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies = signal<Movie[]>([]);

  selectedMovie = signal<Movie | null>(null);

  // Fetches all movies from the backend API and updates the movies signal
  getMovies(sortBy?: 'rating' | 'likeCount') {
    let url = MOVIES_URL;

    // If as sort parameter is provided, add it to the URL as a query param
    if (sortBy) {
      url = `${url}?_sort=-${sortBy}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((value: Movie[]) => {
        console.log('this is the value from the get movies fetch: ', value);

        this.movies.set(value);
      })
      .catch((err) => console.log('Something went wrong:', err));
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
