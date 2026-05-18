import { ApiRecipe, Recipe } from '@models/Recipe';

export class RecipeApiService {
  async fetchRecipes(): Promise<Recipe[]> {
    const response = await fetch('https://dummyjson.com/recipes');

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();

    return data.recipes.map(
      (recipe: ApiRecipe): Recipe => ({
        id: String(recipe.id),
        name: recipe.name,
        typeId: recipe.mealType?.[0]?.toLowerCase() || 'lunch',
        imageUri: recipe.image,
        ingredients: recipe.ingredients || [],
        steps: recipe.instructions || [],
      }),
    );
  }
}
