import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private authStore = inject(AuthStore);

  makeApiCall() {
    // WAY 1 Of adding Authorization token

    // return this.http.get('https://jsonplaceholder.typicode.com/users/1', {
    //   headers: {
    //     Authrozation: `Bearer ${this.authStore.token()?.token}`,
    //   },
    // });

    // WAY 2
    return this.http.get('https://jsonplaceholder.typicode.com/users/1');
  }
}
