import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { RecipesScreen } from '../screens/recipes/RecipesScreen';
import { Recipe } from '../models/recipe/intrfaces/recipe';
import { RecipeScreen } from '../screens/recipe/RecipeScreen';
import { Product } from '../models/product/intrfaces/product';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { ProductScreen } from '../screens/product/ProductScreen';

export interface RecipesStackParamList {
  Recipes: { newRecipe?: Recipe; updatedRecipe?: Recipe };
  Recipe: { recipe?: Recipe; product?: Product };
  Products: {
    selectedProducts?: string[];
    newProduct?: Product;
    updatedProduct?: Product;
    parentStack: 'Calculator' | 'Recipe';
    recipe?: Recipe;
  };
  Product: { product?: Product; recipe?: Recipe };
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
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerShown: true, title: 'Products' }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={({ route }) => ({ title: route.params?.product?.title || 'Create Product' })}
      />
    </Stack.Navigator>
  );
};
