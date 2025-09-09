import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Movie,
  ReviewFormValue,
} from '../../feature/movies/models/movie-model';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private http = inject(HttpClient);

  fetchMovies(sortBy?: 'rating' | 'likeCount') {
    const params: { [key: string]: string } = {};

    if (sortBy) params['_sort'] = `-${sortBy}`;

    return this.http.get<Movie[]>(`${BASE_URL}/movies`, {
      params,
    });
  }

  fetchMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${BASE_URL}/movies/${id}`);
  }

  postMovie(reqMovie: ReviewFormValue) {
    return this.http.post<Movie>(`${BASE_URL}/movies`, {
      ...reqMovie,
      likeCount: 0,
    });
  }

  patchMovie(id: string, reqMovie: Partial<Movie>) {
    return this.http.patch<Movie>(`${BASE_URL}/movies/${id}`, reqMovie);
  }

  putMovie(id: string, reqMovie: Movie) {
    return this.http.put<Movie>(`${BASE_URL}/movies/${id}`, reqMovie);
  }
}
