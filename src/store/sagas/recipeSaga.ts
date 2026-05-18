import { call, put, takeLatest } from 'redux-saga/effects';
import { RecipeRepository } from '@repositories/RecipeRepository';
import {
  LOAD_RECIPES_REQUEST,
  REFRESH_RECIPES_REQUEST,
  ADD_RECIPE_REQUEST,
  UPDATE_RECIPE_REQUEST,
  DELETE_RECIPE_REQUEST,
  loadRecipesSuccess,
  loadRecipesFailure,
} from '@store/actions/recipeActions';

const repository = new RecipeRepository();

function* loadRecipes() {
  try {
    const recipes = yield call([repository, repository.getRecipes]);
    yield put(loadRecipesSuccess(recipes));
  } catch {
    yield put(loadRecipesFailure('Failed to load recipes'));
  }
}

function* refreshRecipes() {
  try {
    const recipes = yield call([repository, repository.refreshRecipes]);
    yield put(loadRecipesSuccess(recipes));
  } catch {
    yield put(loadRecipesFailure('Failed to refresh recipes'));
  }
}

function* insertRecipe(action: any) {
  const recipes = yield call(
    [repository, repository.insertRecipe],
    action.payload,
  );

  yield put(loadRecipesSuccess(recipes));
}

function* updateRecipe(action: any) {
  const recipes = yield call(
    [repository, repository.updateRecipe],
    action.payload,
  );

  yield put(loadRecipesSuccess(recipes));
}

function* deleteRecipe(action: any) {
  const recipes = yield call(
    [repository, repository.deleteRecipe],
    action.payload,
  );

  yield put(loadRecipesSuccess(recipes));
}

export default function* recipeSaga() {
  yield takeLatest(LOAD_RECIPES_REQUEST, loadRecipes);
  yield takeLatest(REFRESH_RECIPES_REQUEST, refreshRecipes);
  yield takeLatest(ADD_RECIPE_REQUEST, insertRecipe);
  yield takeLatest(UPDATE_RECIPE_REQUEST, updateRecipe);
  yield takeLatest(DELETE_RECIPE_REQUEST, deleteRecipe);
}
