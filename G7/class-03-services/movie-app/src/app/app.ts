import { Component, inject, OnInit } from '@angular/core';
import { Header } from './core/components/header/header';
import { Logger } from './core/services/logger';
import { MovieList } from './feature/movies/components/movie-list/movie-list';
import { MovieDetails } from './feature/movies/components/movie-details/movie-details';

@Component({
  selector: 'app-root',
  imports: [Header, MovieList, MovieDetails],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private loggerService = inject(Logger);
  title = 'Movies App / Services';

  ngOnInit(): void {
    this.loggerService.logDetails('App Component');
  }
}
