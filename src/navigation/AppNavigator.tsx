import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import LoginScreen from '@screens/LoginScreen';
import RecipeListScreen from '@screens/RecipeListScreen';
import InsertRecipeScreen from '@screens/InsertRecipeScreen';
import RecipeDetailScreen from '@screens/RecipeDetailScreen';
import { useAuth } from '@hooks/useAuth';
import { Colors } from '@utils/common';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn, initialized, restoreSession } = useAuth();

  useEffect(() => {
    restoreSession();
  }, []);

  if (!initialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen name="RecipeList" component={RecipeListScreen} />
            <Stack.Screen name="InsertRecipe" options={{ title: 'New Recipe'}} component={InsertRecipeScreen} />
            <Stack.Screen name="RecipeDetail" options={{ title: 'Recipe Detail'}} component={RecipeDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
