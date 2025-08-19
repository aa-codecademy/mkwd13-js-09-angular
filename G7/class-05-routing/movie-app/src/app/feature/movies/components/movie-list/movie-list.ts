import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies-service';
import { MovieItem } from '../movie-item/movie-item';
import { Movie } from '../../models/movie-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-movie-list',
  imports: [MovieItem, Button],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList implements OnInit {
  private moviesService = inject(MoviesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // a reference to moviesService.movies
  movies = this.moviesService.movies;

  ngOnInit(): void {
    const sortBy = this.route.snapshot.queryParams['_sort'];

    this.moviesService.getMovies(sortBy);

    this.route.queryParams.subscribe((value) => {
      console.log('this is the value in the query params subscribe: ', value);

      const sortBy = value['_sort'];

      this.moviesService.getMovies(sortBy);
    });
  }

  onMovieClick(movie: Movie) {
    this.moviesService.movieSelect(movie);

    // Navigate to the movie details page using the movie's ID
    this.router.navigate(['movies', movie.id]);
    // Alternative navigation method below
    // this.router.navigateByUrl(`/movies/${movie.id}`);
  }

  // Called when a sort button is clicked
  onSortClick(sortBy: 'rating' | 'likeCount') {
    // Update the query parameters in the URL to trigger sorting
    // Only query params change, route stays the same
    this.router.navigate([], {
      queryParams: {
        _sort: sortBy,
      },
    });
  }

  resetSort() {
    // Navigate to the same route without any query params
    this.router.navigate([]);
  }
}
