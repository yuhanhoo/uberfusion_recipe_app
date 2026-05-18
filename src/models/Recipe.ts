export interface Recipe {
  id: string;
  name: string;
  typeId: string;
  imageUri: string;
  ingredients: string[];
  steps: string[];
}

export interface ApiRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  mealType?: string[];
}
