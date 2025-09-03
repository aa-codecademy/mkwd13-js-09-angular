import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm: FormGroup;

  authStore = inject(AuthStore);

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid || !this.authStore.isLoading()) {
      const credentials = this.loginForm.value;
      console.log(credentials);

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed: ', error);
          // TODO: Handle errors for better UX
        },
      });
    }
  }
}
