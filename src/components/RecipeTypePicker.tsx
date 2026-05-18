import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import recipeTypes from '@data/recipetypes.json';
import { Colors } from '@utils/common';

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
  const data = [
    ...(includeAll
      ? [
          {
            label: 'All Recipes',
            value: 'all',
          },
        ]
      : []),
    ...recipeTypes.map(type => ({
      label: type.name,
      value: type.id,
    })),
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select Recipe Type"
        value={selectedValue}
        onChange={item => onValueChange(item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
  },
  dropdown: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
  },
  placeholder: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
