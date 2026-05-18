import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/store';
import {
  loginRequest,
  logoutRequest,
  restoreSessionRequest,
} from '@store/actions/authActions';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error, initialized } = useSelector(
    (state: RootState) => state.auth,
  );

  const login = (username: string, password: string) => {
    dispatch(loginRequest(username, password));
  };

  const logout = () => {
    dispatch(logoutRequest());
  };

  const restoreSession = () => {
    dispatch(restoreSessionRequest());
  };

  const isLoggedIn = !!user;

  return {
    user,
    loading,
    error,
    initialized,
    isLoggedIn,
    login,
    logout,
    restoreSession,
  };
}
