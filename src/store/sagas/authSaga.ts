import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthRepository } from '@repositories/AuthRepository';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  RESTORE_SESSION_REQUEST,
} from '@store/actions/authActions';

const repository = new AuthRepository();

function* login(action: any): Generator<any> {
  try {
    const user = yield call([repository, repository.login], action.payload);

    yield put({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch {
    yield put({
      type: LOGIN_FAILURE,
      payload: 'Invalid credentials',
    });
  }
}

function* logout() {
  yield call([repository, repository.logout]);
}

function* restoreSession(): any {
  try {
    const user = yield call([repository, repository.getSession]);

    if (user) {
      yield put({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    } else {
      yield put({
        type: LOGIN_FAILURE,
        payload: null,
      });
    }
  } catch {
    yield put({
      type: LOGIN_FAILURE,
      payload: 'Session restore failed',
    });
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(LOGOUT_REQUEST, logout);
  yield takeLatest(RESTORE_SESSION_REQUEST, restoreSession);
}
