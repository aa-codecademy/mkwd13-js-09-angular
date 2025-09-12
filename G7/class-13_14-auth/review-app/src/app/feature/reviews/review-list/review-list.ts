import { Component, inject, OnInit } from '@angular/core';
import { ReviewsService } from '../../../core/services/reviews-service';
import { ReviewItem } from '../review-item/review-item';

@Component({
  selector: 'app-review-list',
  imports: [ReviewItem],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList implements OnInit {
  private reviewsService = inject(ReviewsService);

  reviews = this.reviewsService.reviews;

  ngOnInit(): void {
    this.reviewsService.getReviews();
  }
}
