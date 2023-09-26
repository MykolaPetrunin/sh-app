import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthTabs } from './AuthTabs';
import { ForgotPasswordScreen } from '../screens/forgotPassword/ForgotPasswordScreen';
const Stack = createNativeStackNavigator();

export interface AuthStackParamList {
  Auth: undefined;
  ForgotPassword: undefined;
}

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: true, title: 'Forgot Password?' }}
      />
    </Stack.Navigator>
  );
};
