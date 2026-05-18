import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Card, TextInput, Button, Text } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import RecipeTypePicker from '@components/RecipeTypePicker';
import { Colors } from '@utils/common';

interface RecipeFormProps {
  initialRecipe?: any;
  onSubmit: (recipe: any) => void;
  onDelete?: () => void;
  isEdit?: boolean;
}

export default function RecipeForm({
  initialRecipe,
  onSubmit,
  onDelete,
  isEdit = false,
}: RecipeFormProps) {
  const [name, setName] = useState(initialRecipe?.name || '');
  const [typeId, setTypeId] = useState(initialRecipe?.typeId || 'breakfast');
  const [imageUri, setImageUri] = useState(initialRecipe?.imageUri || '');
  const [ingredients, setIngredients] = useState<string[]>(
    initialRecipe?.ingredients || [''],
  );
  const [steps, setSteps] = useState<string[]>(initialRecipe?.steps || ['']);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || '');
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated.length ? updated : ['']);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated.length ? updated : ['']);
  };

  const submit = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Recipe name is required');
      return;
    }

    if (ingredients.filter(i => i.trim()).length === 0) {
      Alert.alert('Validation', 'Add at least one ingredient');
      return;
    }

    if (steps.filter(s => s.trim()).length === 0) {
      Alert.alert('Validation', 'Add at least one step');
      return;
    }

    onSubmit({
      name: name.trim(),
      typeId,
      imageUri,
      ingredients: ingredients.filter(i => i.trim()),
      steps: steps.filter(s => s.trim()),
    });
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.keyBoardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.imageCard} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text variant="titleMedium">Tap to add recipe photo</Text>
              </View>
            )}
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Recipe Details
              </Text>

              <TextInput
                label="Recipe Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                activeOutlineColor={Colors.primary}
                style={styles.input}
              />

              <Text style={styles.recipeType}>Recipe Type</Text>
              <RecipeTypePicker
                selectedValue={typeId}
                onValueChange={setTypeId}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                <Text variant="titleLarge">Ingredients</Text>

                <Button
                  mode="contained-tonal"
                  buttonColor={Colors.primaryLight}
                  onPress={addIngredient}
                >
                  Add
                </Button>
              </View>

              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.listRow}>
                  <TextInput
                    mode="outlined"
                    style={styles.flexInput}
                    value={ingredient}
                    onChangeText={text => updateIngredient(index, text)}
                    activeOutlineColor={Colors.primary}
                    label={`Ingredient ${index + 1}`}
                  />

                  <Button
                    mode="text"
                    textColor={Colors.textSecondary}
                    onPress={() => removeIngredient(index)}
                  >
                    Remove
                  </Button>
                </View>
              ))}
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                <Text variant="titleLarge">Steps</Text>

                <Button
                  mode="contained-tonal"
                  buttonColor={Colors.primaryLight}
                  onPress={addStep}
                >
                  Add
                </Button>
              </View>

              {steps.map((step, index) => (
                <View key={index} style={styles.listRow}>
                  <TextInput
                    mode="outlined"
                    multiline
                    style={styles.flexInput}
                    value={step}
                    onChangeText={text => updateStep(index, text)}
                    activeOutlineColor={Colors.primary}
                    label={`Step ${index + 1}`}
                  />

                  <Button
                    mode="text"
                    textColor={Colors.textSecondary}
                    onPress={() => removeStep(index)}
                  >
                    Remove
                  </Button>
                </View>
              ))}
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        {isEdit && onDelete ? (
          <Button mode="outlined" onPress={onDelete} textColor={Colors.danger}>
            Delete
          </Button>
        ) : null}

        <Button
          mode="contained"
          buttonColor={Colors.primary}
          textColor={Colors.textPrimary}
          onPress={submit}
          style={styles.saveButton}
        >
          {isEdit ? 'Update Recipe' : 'Create Recipe'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyBoardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  imageCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  image: {
    width: '100%',
    height: 220,
  },
  imagePlaceholder: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: Colors.surface,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  recipeType: {
    fontSize: 10,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flexInput: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    backgroundColor: 'white',
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveButton: {
    flex: 1,
  },
});
