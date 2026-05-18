import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import recipeReducer from '@store/reducers/recipeReducer';
import authReducer from '@store/reducers/authReducer';
import rootSaga from '@store/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
