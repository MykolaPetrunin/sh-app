import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { RecipesScreen } from '../screens/recipes/RecipesScreen';
import { Recipe } from '../models/recipe/intrfaces/recipe';
import { RecipeScreen } from '../screens/recipe/RecipeScreen';
import { Product } from '../models/product/intrfaces/product';

export interface RecipesStackParamList {
  Recipes: { newRecipe?: Recipe; updatedRecipe?: Recipe };
  Recipe: { recipe?: Recipe; product?: Product };
  [key: string]: undefined | object;
}

const Stack = createNativeStackNavigator<RecipesStackParamList>();

export const RecipesStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Recipes">
      <Stack.Screen name="Recipes" component={RecipesScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={({ route }) => ({ title: route.params.recipe?.title || 'Create Recipe' })}
      />
    </Stack.Navigator>
  );
};
