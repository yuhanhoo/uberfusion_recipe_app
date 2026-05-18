import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import recipeTypes from '@data/recipetypes.json';

interface Props {
  selectedValue: string;
  onValueChange: (value: string) => void;
  includeAll?: boolean;
}

export default function RecipeTypePicker({
  selectedValue,
  onValueChange,
  includeAll = false,
}: Props) {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      {includeAll && <Picker.Item label="All Recipes" value="all" />}
      {recipeTypes.map(type => (
        <Picker.Item key={type.id} label={type.name} value={type.id} />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
  },
});