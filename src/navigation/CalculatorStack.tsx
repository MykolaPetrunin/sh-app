import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { CalculatorScreen } from '../screens/calculator/CalculatorScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { Product } from '../models/product/intrfaces/product';
import { ProductScreen } from '../screens/product/ProductScreen';

export interface CalculatorStackParamList {
  Calculator: { product?: Product };
  Products: {
    selectedProducts?: string[];
    newProduct?: Product;
    updatedProduct?: Product;
    parentStack: 'Calculator' | 'Recipe';
  };
  Product: { product?: Product };
  [key: string]: undefined | object;
}

const Stack = createNativeStackNavigator<CalculatorStackParamList>();

export const CalculatorStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Calculator">
      <Stack.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerShown: true, title: 'Products' }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={({ route }) => ({ title: route.params.product?.title || 'Create Product' })}
      />
    </Stack.Navigator>
  );
};
