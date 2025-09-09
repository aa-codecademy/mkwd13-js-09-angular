import { Component, effect, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../../../shared/components/button/button';
import { Movie, ReviewFormValue } from '../../models/movie-model';

@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.scss',
})
export class MovieForm {
  editMovieData = input<Movie>();
  submitOutput = output<ReviewFormValue>();

  reviewForm = this.generateForm();

  constructor() {
    effect(() => {
      console.log(
        'This is the edit data value in the effect: ',
        this.editMovieData()
      );

      if (this.editMovieData()) {
        this.populateForm(this.editMovieData());
      }
    });
  }

  generateForm() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      year: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1850),
      ]),
      author: new FormControl('', Validators.required),
      rating: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      text: new FormControl<string>('', Validators.required),
      genres: new FormControl<string>('', Validators.required),
    });
  }

  populateForm(movie: Movie) {
    this.reviewForm.setValue({
      title: movie.title,
      director: movie.director,
      author: movie.author,
      genres: movie.genres,
      text: movie.text,
      year: movie.year,
      rating: movie.rating,
    });

    this.reviewForm.controls.title.disable();
    this.reviewForm.controls.year.disable();
    this.reviewForm.controls.director.disable();
  }

  onFormSubmit() {
    this.reviewForm.markAllAsTouched();

    if (this.reviewForm.invalid) return;

    // console.log('RAW VALUE: ', this.reviewForm.getRawValue());
    // console.log('VALUE: ', this.reviewForm.value);

    this.submitOutput.emit(this.reviewForm.value as ReviewFormValue);
  }
}
