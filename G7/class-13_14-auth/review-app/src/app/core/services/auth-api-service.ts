import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegisterReq,
  User,
  UserCredentials,
} from '../../feature/auth/auth-model';
import { BASE_URL } from '../core-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  // 1. REGISTER
  // Sends a POST request to the backend API to register a new user
  // Params: 'req' contains the data (email, password, username...)
  registerUser(req: RegisterReq) {
    // POST to http://localhost:3000/api/auth/register
    return this.http.post(`${BASE_URL}/auth/register`, req);
  }

  // 2. LOGIN
  // Send a POST request with the user's login credentials
  // By default, Angular's HttpClient only gives you the response body when you make a request.
  // When you need extra info like: Status code, Headers etc. you need to use observe: 'response'.
  loginUser(credentials: UserCredentials) {
    return this.http.post<User>(`${BASE_URL}/auth/login`, credentials, {
      observe: 'response',
    });
  }

  // 3. LOGOUT
  // Sends a GET request to log out the user.
  // The backend expects the refresh token in the headers, so we attach it.
  logoutUser(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/logout`, {
      headers: {
        'refresh-token': refreshToken,
      },
    });
  }
}
