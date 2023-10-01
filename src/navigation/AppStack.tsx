import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { MainTabs } from './MainTabs';

const Stack = createNativeStackNavigator();

export const AppStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Calculator">
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
