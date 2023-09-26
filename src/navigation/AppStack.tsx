import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CalculatorScreen } from '../screens/calculator/CalculatorScreen';
import { FC } from 'react';

const Stack = createNativeStackNavigator();

export const AppStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
    </Stack.Navigator>
  );
};
