import { Movie } from './models/movie.model';

export const moviesMock: Movie[] = [
  {
    id: 1,
    title: 'The Godfather',
    year: 1971,
    genres: 'drama, crime',
    rating: 10,
    text: 'A landmark of cinema!',
    author: 'Dimitar',
    director: 'Francis Ford Copolla',
    likeCount: 521,
  },
  {
    id: 2,
    title: 'The Matrix',
    year: 1971,
    genres: 'sci-fi, action',
    rating: 9,
    text: 'One of the best sci-fi epics of the 20th century!',
    author: 'Dimitar',
    director: 'The Wachowskis',
    likeCount: 521,
  },
  {
    id: 3,
    title: 'Oppenheimer',
    year: 2023,
    genres: 'biography, drama, history',
    rating: 10,
    text: 'A landmark of cinema!',
    author: 'Cilian Murphy',
    director: 'Christopher Nolan',
    likeCount: 521,
  },
];
