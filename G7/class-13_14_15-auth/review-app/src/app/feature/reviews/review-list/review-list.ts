import { Component, inject, OnInit } from '@angular/core';
import { ReviewsService } from '../../../core/services/reviews-service';
import { ReviewItem } from '../review-item/review-item';
import { PaginationOutput } from '../../../shared/shared.model';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-review-list',
  imports: [ReviewItem, Pagination],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss',
})
export class ReviewList implements OnInit {
  private reviewsService = inject(ReviewsService);

  reviews = this.reviewsService.reviews;
  totalCount = this.reviewsService.totalCount;

  ngOnInit(): void {
    this.reviewsService.getReviews();
  }

  onPaginationOutput(output: PaginationOutput) {
    this.reviewsService.getReviews(output.firstResult, output.maxResults);
  }
}
