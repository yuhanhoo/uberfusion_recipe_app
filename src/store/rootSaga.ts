import { all } from 'redux-saga/effects';
import recipeSaga from '@store/sagas/recipeSaga';
import authSaga from '@store/sagas/authSaga';

export default function* rootSaga() {
  yield all([recipeSaga(), authSaga()]);
}
