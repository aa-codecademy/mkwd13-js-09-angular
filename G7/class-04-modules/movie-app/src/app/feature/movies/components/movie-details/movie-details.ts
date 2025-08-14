import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies-service';
import { Movie } from '../../models/movie-model';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails implements OnInit {
  private moviesService = inject(MoviesService);

  selectedMovie: Movie;

  ngOnInit(): void {
    // Subscribe to selectedMovie$ from the service to get updates whenever the selected movie changes.
    this.moviesService.selectedMovie$.subscribe((value) => {
      console.log('THIS IS THE SELECTED MOVIE: ', value);

      this.selectedMovie = value;
    });
  }
}
