import { useEffect, useState, useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import RecipeCard from '@components/RecipeCard';
import RecipeTypePicker from '@components/RecipeTypePicker';
import { useRecipes } from '@hooks/useRecipes';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@hooks/useAuth';
import { Colors } from '@utils/common';

export default function RecipeListScreen() {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();
  const [selectedType, setSelectedType] = useState('all');
  const { recipes, loading, loadRecipes, refreshRecipes } =
    useRecipes(selectedType);

  useEffect(() => {
    loadRecipes();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user ? `${user.firstName}'s Recipes` : 'Recipes',
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={28} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, user]);

  if (loading && recipes.length === 0) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator color={Colors.primary} size="large" />
        <Text style={styles.loadingText}>Loading recipes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <RecipeTypePicker
          selectedValue={selectedType}
          onValueChange={setSelectedType}
          includeAll
        />
      </View>
      <FlatList
        data={recipes}
        keyExtractor={item => item.id}
        refreshing={loading}
        onRefresh={refreshRecipes}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No recipes found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() =>
              navigation.navigate('RecipeDetail', {
                recipeId: item.id,
              })
            }
          />
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('InsertRecipe')}
      >
        <Ionicons name="add" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: { marginHorizontal: 16 },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  empty: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  loadingText: {
    marginTop: 12,
  },
  logoutButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
