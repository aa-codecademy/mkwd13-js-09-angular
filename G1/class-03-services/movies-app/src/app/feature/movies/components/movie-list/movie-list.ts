import { Component, OnInit, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { moviesMock } from '../../movies.mock';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList implements OnInit {
  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movies.set(moviesMock);

    console.log(this.movies());
  }
}
