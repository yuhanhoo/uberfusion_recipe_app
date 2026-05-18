import { useEffect, useState } from 'react';
import DropDown from 'react-native-paper-dropdown';
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
  const [showDropDown, setShowDropDown] = useState(false);

  const [list, setList] = useState([]);

  useEffect(() => {
    const mapped = recipeTypes.map(type => ({
      label: type.name,
      value: type.id,
    }));

    if (includeAll) {
      mapped.unshift({
        label: 'All Recipes',
        value: 'all',
      });
    }

    setList(mapped);
  }, []);

  return (
    <DropDown
      label="Recipe Type"
      mode="outlined"
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={selectedValue}
      setValue={onValueChange}
      list={list}
    />
  );
}
