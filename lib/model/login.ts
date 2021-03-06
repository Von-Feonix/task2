import internal from 'stream';
import { Role } from '../constant/role';

export interface LoginFormValues {
  role: Role;
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormValues {
  id: number;
  email: string;
  password: string;
  role: string;
}

export type LoginRequest = LoginFormValues;

export interface LoginResponse {
  token: string;
  role: Role;
  userId: number;
}

export type SignUpRequest = RegisterFormValues;
