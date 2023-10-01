import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { CalculatorScreen } from '../screens/calculator/CalculatorScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { Product } from '../models/product/intrfaces/product';

const Stack = createNativeStackNavigator();

export interface CalculatorStackParamList {
  Calculator: { product?: Product };
  Products: { selectedProducts: string[] };
}

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
    </Stack.Navigator>
  );
};
