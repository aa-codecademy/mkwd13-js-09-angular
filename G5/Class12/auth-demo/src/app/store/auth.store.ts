import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthState, AuthToken, User, UserRole } from '../models/user.interface';
import { computed } from '@angular/core';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    return {
      isLoggedIn: computed(() => !!store.user()),
      isUser: computed(() => store.user()?.role === UserRole.USER),
      isAdmin: computed(() => store.user()?.role === UserRole.ADMIN),
    };
  }),

  withMethods((store) => ({
    setIsLoading: (isLoading: boolean) => {
      patchState(store, { isLoading });
    },
    setError: (error: string | null) => {
      patchState(store, { error });
    },
    setUser: (user: User | null) => {
      patchState(store, { user });
    },
    login: (user: User, token: AuthToken) => {
      patchState(store, { user, token, error: null, isLoading: false });

      localStorage.setItem('auth_token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
    },

    logout: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      patchState(store, initialState);
    },

    loadFromStorage: () => {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

      if (storedUser && storedToken) {
        const token: AuthToken = JSON.parse(storedToken);
        const user: User = JSON.parse(storedUser);

        if (new Date() < new Date(token.expiresAt)) {
          // token still valid;
          patchState(store, { user, token });
        } else {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          patchState(store, initialState);
        }
      }
    },
  }))
);
