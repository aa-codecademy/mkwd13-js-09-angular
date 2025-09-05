export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export type UserWithPassword = User & {
  password: string;
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface AuthToken {
  token: string;
  expiresAt: Date;
}

export interface LoginCrentials {
  username: string;
  password: string;
}

// used at the store
export interface AuthState {
  user: User | null;
  token: AuthToken | null;
  isLoading: boolean;
  error: string | null;
}
