import React from 'react';
import RecipeForm from '@components/RecipeForm';
import { useRecipes } from '@hooks/useRecipes';
import { RecipeFormData } from '@models/RecipeFormData';

export default function InsertRecipeScreen({ navigation }: any) {
  const { insertRecipe } = useRecipes();

  const handleSubmit = (recipeData: RecipeFormData) => {
    insertRecipe({
      id: recipeData.name,
      ...recipeData,
    });

    navigation.goBack();
  };

  return <RecipeForm onSubmit={handleSubmit} />;
}
