import { AuthUser } from '@models/Auth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const RESTORE_SESSION_REQUEST = 'RESTORE_SESSION_REQUEST';

export const loginRequest = (username: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const loginRequestSuccess = (user: AuthUser) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginRequestFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const restoreSessionRequest = () => ({
  type: RESTORE_SESSION_REQUEST,
});
