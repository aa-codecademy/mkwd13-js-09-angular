import { Component, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
})
export class CommentForm {
  maxLength = 160;

  commentOutput = output<string>();

  commentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.maxLength),
    ]),
  });

  onFormSubmit() {
    this.commentForm.markAllAsTouched();

    if (this.commentForm.invalid) return;

    this.commentOutput.emit(this.commentForm.controls.text.value);

    this.commentForm.reset({
      text: '',
    });
  }
}
