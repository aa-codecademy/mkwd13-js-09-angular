import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReviewComment } from '../review-model';

@Component({
  selector: 'app-comment-list',
  imports: [DatePipe],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss',
})
export class CommentList {
  comments = input.required<ReviewComment[]>();
}
