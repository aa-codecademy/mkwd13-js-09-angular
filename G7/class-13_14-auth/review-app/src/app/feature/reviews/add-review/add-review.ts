import { Component, inject } from '@angular/core';
import { ReviewForm } from '../review-form/review-form';
import { AddReviewReq } from '../review-model';
import { ReviewsService } from '../../../core/services/reviews-service';

@Component({
  selector: 'app-add-review',
  imports: [ReviewForm],
  templateUrl: './add-review.html',
  styleUrl: './add-review.scss',
})
export class AddReview {
  private reviewsService = inject(ReviewsService);

  onReviewAdd(req: AddReviewReq) {
    this.reviewsService.addReview(req);
  }
}
