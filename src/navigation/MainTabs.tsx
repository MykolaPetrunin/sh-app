import { FC } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RecipesScreen } from '../screens/recipes/RecipesScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { CalculatorStack } from './CalculatorStack';

const Tab = createMaterialBottomTabNavigator();

export const MainTabs: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="CalculatorStack"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="CalculatorStack"
        component={CalculatorStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calculator-variant" color={color} size={26} />
          ),
          tabBarLabel: 'Calculator',
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food-fork-drink" color={color} size={26} />
          ),
          tabBarLabel: 'Recipes',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={26} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
