import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies-service';
import { Button } from '../../../../shared/components/button/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  imports: [Button],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails implements OnInit {
  private moviesService = inject(MoviesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  selectedMovie = this.moviesService.selectedMovie;

  ngOnInit(): void {
    console.log(this.route.snapshot);

    const movieId: string = this.route.snapshot.params['id'];

    this.moviesService.getMovieById(movieId);
  }

  onClickLikeDislike(type: 'LIKE' | 'DISLIKE') {
    this.moviesService.addLikeDislike(type);
  }

  goToEditMovie() {
    this.router.navigate(['edit-movie', this.selectedMovie().id]);
  }
}
