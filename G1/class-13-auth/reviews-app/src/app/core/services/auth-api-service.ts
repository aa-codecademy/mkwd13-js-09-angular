import { HttpClient, HttpResponse } from '@angular/common/http';
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

  registerUser(req: RegisterReq) {
    return this.http.post(`${BASE_URL}/auth/register`, req);
  }

  loginUser(credentials: UserCredentials) {
    return this.http.post<User>(`${BASE_URL}/auth/login`, credentials, {
      observe: 'response',
    });
  }

  logoutUser(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/logout`, {
      headers: {
        'refresh-token': refreshToken,
      },
    });
  }

  refreshAccessToken(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/refresh-token`, {
      headers: {
        'refresh-token': refreshToken,
      },
      //We observe the response to get the new access token and refresh token from the headers
      observe: 'response',
    });
  }
}
