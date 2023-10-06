import React, { FC, ReactElement } from 'react';
import { Card } from 'react-native-paper';
import { View } from 'react-native';
import { Recipe } from '../../../models/recipe/intrfaces/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: (recipe: Recipe) => void;
  actions?: ReactElement;
}

export const RecipeCard: FC<RecipeCardProps> = ({ actions, recipe, onPress }) => {
  return (
    <View style={{ padding: 4 }}>
      <Card onPress={onPress ? () => onPress(recipe) : undefined}>
        <Card.Title title={recipe.title} right={() => actions} />
      </Card>
    </View>
  );
};
