export interface LoginDto {
  email: string;
  password: string;
}

export enum Role {
  REGULAR = 'regular',
  LOYAL = 'loyal',
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
