import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { AddReviewReq, Review } from '../review-model';
import { RatingPanel } from '../../../shared/components/rating-panel/rating-panel';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule, CommonModule, Button, RatingPanel],
  templateUrl: './review-form.html',
  styleUrl: './review-form.scss',
})
export class ReviewForm {
  editReviewData = input<Review>();
  submitOutput = output<AddReviewReq>();

  movieSubmitted = signal(false);
  reviewForm = this.generateForm();

  constructor() {
    effect(() => {
      if (this.editReviewData()) this.populateForm(this.editReviewData());
    });
  }

  generateForm() {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      poster: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      year: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1850),
        Validators.max(2025),
      ]),
      rating: new FormControl<number>(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
      text: new FormControl('', Validators.required),
      genres: new FormControl('', Validators.required),
    });
  }

  populateForm(review: Review) {
    // Removing properties that aren't matched to controls in the form
    // const { id, likeCount, ...restOfMovie } = movie;

    this.reviewForm.setValue({
      title: review.title,
      poster: review.poster,
      genres: review.genres,
      director: review.director,
      year: review.year,
      text: review.text,
      rating: Math.floor(review.rating),
    });

    this.reviewForm.controls.director.disable();
    this.reviewForm.controls.title.disable();
    this.reviewForm.controls.year.disable();
  }

  onFormSubmit() {
    this.movieSubmitted.set(true);
    this.reviewForm.markAllAsTouched();

    if (this.reviewForm.invalid) return;

    this.submitOutput.emit(this.reviewForm.value as AddReviewReq);
  }

  onChangeRating(rating: number) {
    this.reviewForm.controls.rating.setValue(rating);
  }
}
