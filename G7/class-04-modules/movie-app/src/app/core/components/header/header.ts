import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  private moviesService = inject(MoviesService);

  totalLikes: number;
  avgRating: number;

  ngOnInit(): void {
    console.log('header comp');

    this.moviesService.movies$.subscribe((value) => {
      // Calculate the total number of likes by adding up likeCount for each movie.
      this.totalLikes = value.reduce((acc, el) => acc + el.likeCount, 0);

      this.avgRating =
        value.reduce((acc, el) => acc + el.rating, 0) / value.length;
    });
  }

  ngOnDestroy(): void {
    // we unsubscribe from subjects/observables in ngOnDestroy
    this.moviesService.movies$.unsubscribe();
  }
}
