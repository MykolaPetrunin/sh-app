import { SignInScreen } from '../screens/signIn/SignInScreen';
import { SignUpScreen } from '../screens/signUp/SignUpScreen';
import { FC } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export const AuthTabs: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={26} />
          ),
          tabBarLabel: 'SignIn',
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus-outline" color={color} size={26} />
          ),
          tabBarLabel: 'SignUp',
        }}
      />
    </Tab.Navigator>
  );
};
