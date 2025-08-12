import { Component, inject } from '@angular/core';
import { Movies } from '../../../../core/services/movies';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-movie-details',
  imports: [Button],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails {
  private moviesService = inject(Movies);

  // This is a reference to the signal defined in the service.
  // It is not a new signal instance — it points to the original,
  // so any reads/writes will directly reflect on the service's signal.
  selectedMovie = this.moviesService.selectedMovie;

  onClickLikeDislike(type: 'LIKE' | 'DISLIKE') {
    console.log('like/dislike method called: ', type);

    this.moviesService.addLikeDislike(type, this.selectedMovie()?.id);
  }
}
