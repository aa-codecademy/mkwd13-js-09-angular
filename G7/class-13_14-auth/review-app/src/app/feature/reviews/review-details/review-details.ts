import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../../core/services/reviews-service';
import { AuthService } from '../../../core/services/auth-service';
import { CommonModule } from '@angular/common';
import { CommentForm } from '../comment-form/comment-form';
import { CommentList } from '../comment-list/comment-list';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-review-details',
  imports: [CommonModule, CommentForm, CommentList, Button],
  templateUrl: './review-details.html',
  styleUrl: './review-details.scss',
})
export class ReviewDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reviewsService = inject(ReviewsService);
  userData = inject(AuthService).userData;

  selectedReview = this.reviewsService.selectedReview;

  genresArr = computed(() => this.selectedReview().genres.split(', '));
  likeDislikeStatus = computed<{ likeAdded: boolean; dislikeAdded: boolean }>(
    () => ({
      likeAdded: !!this.selectedReview().likes.find(
        (likeId) => likeId === this.userData().id,
      ),
      dislikeAdded: !!this.selectedReview().dislikes.find(
        (dislikeId) => dislikeId === this.userData().id,
      ),
    }),
  );

  comments = this.reviewsService.comments;
  commentsTotalCount = this.reviewsService.commentsTotalCount;
  currentPage = signal(1);
  maxPages = computed(() => Math.ceil(this.commentsTotalCount() / 10));

  constructor() {
    effect(() => {
      console.log(this.selectedReview()?.user.id !== this.userData().id);

      if (this.selectedReview()?.user.id !== this.userData().id) {
        this.router.navigate(['reviews']);
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.reviewsService.getReviewById(id);
  }

  goToEdit() {
    this.router.navigate(['edit-review', this.selectedReview().id], {
      state: {
        id: this.selectedReview().user.id,
      },
    });
  }

  onAddComment(text: string) {
    this.currentPage.set(1);
    this.reviewsService.createReviewComment(this.selectedReview().id, text);
  }

  onLoadmore() {
    this.currentPage.update((prev) => prev + 1);

    this.reviewsService.getReviewComments(
      this.selectedReview().id,
      (this.currentPage() - 1) * 10 + 1,
      10,
    );
  }

  onAddLikeDislike(type: 'LIKE' | 'DISLIKE') {
    this.reviewsService.addLikeDislike(this.selectedReview().id, type);
  }
}
