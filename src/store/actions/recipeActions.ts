import { Recipe } from '@models/Recipe';

export const LOAD_RECIPES_REQUEST = 'LOAD_RECIPES_REQUEST';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_FAILURE = 'LOAD_RECIPES_FAILURE';
export const ADD_RECIPE_REQUEST = 'ADD_RECIPE_REQUEST';
export const UPDATE_RECIPE_REQUEST = 'UPDATE_RECIPE_REQUEST';
export const DELETE_RECIPE_REQUEST = 'DELETE_RECIPE_REQUEST';
export const REFRESH_RECIPES_REQUEST = 'REFRESH_RECIPES_REQUEST';

export const loadRecipesRequest = () => ({
  type: LOAD_RECIPES_REQUEST,
});

export const loadRecipesSuccess = (recipes: Recipe[]) => ({
  type: LOAD_RECIPES_SUCCESS,
  payload: recipes,
});

export const loadRecipesFailure = (error: string) => ({
  type: LOAD_RECIPES_FAILURE,
  payload: error,
});

export const insertRecipeRequest = (recipe: Recipe) => ({
  type: ADD_RECIPE_REQUEST,
  payload: recipe,
});

export const updateRecipeRequest = (recipe: Recipe) => ({
  type: UPDATE_RECIPE_REQUEST,
  payload: recipe,
});

export const deleteRecipeRequest = (recipeId: string) => ({
  type: DELETE_RECIPE_REQUEST,
  payload: recipeId,
});

export const refreshRecipesRequest = () => ({
  type: REFRESH_RECIPES_REQUEST,
});
