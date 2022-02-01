import { createReducer, on } from '@ngrx/store';
import { login, loginFailed, loginSuccess } from './admin-auth.actions';

export const ADMIN_AUTH_FEATURE_NAME = 'admin-auth';

export interface AuthData {
  accessToken: string;
  // Admin ID
  id: number;
  // Created at timestamp
  iat: number;
  // Expiring at timestamp
  exp: number;
}

export interface AdminAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData | null;
}

const initialState: AdminAuthState = {
  loading: false,
  loaded: true,
  serverError: '',
};

export const adminAuthReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, { type, ...authData }: { type: string } & AuthData) => ({
    ...state,
    authData,
    loading: false,
    loaded: true,
    serverError: '',
  })),
  on(loginFailed, (state, { serverError }) => ({
    ...state,
    serverError,
    authData: null,
    loading: false,
    loaded: true,
  }))
);
