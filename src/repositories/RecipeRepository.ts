import { Recipe } from '@models/Recipe';
import { StorageService } from '@services/StorageService';
import { RecipeApiService } from '@services/RecipeApiService';
import { STORAGE_KEYS } from '@utils/common';

export class RecipeRepository {
  private storageService = new StorageService();
  private apiService = new RecipeApiService();

  async getRecipes(): Promise<Recipe[]> {
    const localRecipes = await this.storageService.getItem<Recipe[]>(
      STORAGE_KEYS.RECIPES,
    );

    if (localRecipes && localRecipes.length > 0) {
      return localRecipes;
    }

    const apiRecipes = await this.apiService.fetchRecipes();
    await this.saveRecipes(apiRecipes);
    return apiRecipes;
  }

  async refreshRecipes(): Promise<Recipe[]> {
    const apiRecipes = await this.apiService.fetchRecipes();
    await this.saveRecipes(apiRecipes);
    return apiRecipes;
  }

  async insertRecipe(recipe: Recipe): Promise<Recipe[]> {
    const recipes = await this.getRecipes();
    const updated = [...recipes, recipe];
    await this.saveRecipes(updated);
    return updated;
  }

  async updateRecipe(updatedRecipe: Recipe): Promise<Recipe[]> {
    const recipes = await this.getRecipes();
    const updated = recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
    );
    await this.saveRecipes(updated);
    return updated;
  }

  async deleteRecipe(recipeId: string): Promise<Recipe[]> {
    const recipes = await this.getRecipes();
    const updated = recipes.filter(recipe => recipe.id !== recipeId);
    await this.saveRecipes(updated);
    return updated;
  }

  async saveRecipes(recipes: Recipe[]): Promise<void> {
    await this.storageService.setItem(STORAGE_KEYS.RECIPES, recipes);
  }
}
