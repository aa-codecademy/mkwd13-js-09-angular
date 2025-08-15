import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies-service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList implements OnInit {
  private moviesService = inject(MoviesService);

  // a reference to moviesService.movies
  movies = this.moviesService.movies;

  ngOnInit(): void {
    this.moviesService.getMovies();
  }
}
