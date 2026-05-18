import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@store/store';
import {
  loadRecipesRequest,
  refreshRecipesRequest,
  insertRecipeRequest,
  updateRecipeRequest,
  deleteRecipeRequest,
} from '@store/actions/recipeActions';
import { Recipe } from '@models/Recipe';

export function useRecipes(selectedType: string = 'all') {
  const dispatch = useDispatch<AppDispatch>();

  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipes,
  );

  const filteredRecipes = useMemo(() => {
    if (selectedType === 'all') {
      return recipes;
    }

    return recipes.filter(recipe => recipe.typeId === selectedType);
  }, [recipes, selectedType]);

  const loadRecipes = () => {
    dispatch(loadRecipesRequest());
  };

  const refreshRecipes = () => {
    dispatch(refreshRecipesRequest());
  };

  const insertRecipe = (recipe: Recipe) => {
    dispatch(insertRecipeRequest(recipe));
  };

  const updateRecipe = (recipe: Recipe) => {
    dispatch(updateRecipeRequest(recipe));
  };

  const deleteRecipe = (recipeId: string) => {
    dispatch(deleteRecipeRequest(recipeId));
  };

  const getRecipeById = (recipeId: string) => {
    return recipes.find(recipe => recipe.id === recipeId);
  };

  return {
    recipes: filteredRecipes,
    allRecipes: recipes,
    loading,
    error,
    loadRecipes,
    refreshRecipes,
    insertRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
  };
}
