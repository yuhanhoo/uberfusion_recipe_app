import React from 'react';
import { View, Alert, Text, StyleSheet } from 'react-native';
import RecipeForm from '@components/RecipeForm';
import { useRecipes } from '@hooks/useRecipes';

export default function RecipeDetailScreen({ route, navigation }: any) {
  const { recipeId } = route.params;
  const { getRecipeById, updateRecipe, deleteRecipe } = useRecipes();
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  const handleUpdate = (updatedData: any) => {
    updateRecipe({
      ...recipe,
      ...updatedData,
    });

    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Delete Recipe', 'Are you sure?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteRecipe(recipeId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <RecipeForm initialRecipe={recipe} isEdit onSubmit={handleUpdate} onDelete={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  delete: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
