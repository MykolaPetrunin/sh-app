import React, { FC, useMemo, useState } from 'react';
import { Button, Card, HelperText, TextInput } from 'react-native-paper';
import { Recipe } from '../../../models/recipe/intrfaces/recipe';
import { useFormik } from 'formik';
import { View } from 'react-native';
import { recipeWeightCardValidation } from './validations/recipeWeightCardValidation';

interface RecipeWeightCardProps {
  recipe: Recipe;
  onCancel: () => void;
  onSubmit: (data: { totalWeight?: number; title: string }) => void;
}

export const RecipeWeightCard: FC<RecipeWeightCardProps> = ({ onCancel, onSubmit, recipe }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const totalWeight = useMemo(
    () => (recipe.products || []).reduce((acc, { quantity }) => acc + quantity, 0),
    [recipe],
  );

  const formik = useFormik<{ totalWeight: number; title: string }>({
    initialValues: {
      title: recipe.title,
      totalWeight: (recipe.products || []).reduce((acc, { quantity }) => acc + quantity, 0),
    },
    validationSchema: recipeWeightCardValidation,
    onSubmit: (val) => {
      setIsLoading(true);
      onSubmit({
        totalWeight: val.totalWeight === totalWeight ? undefined : val.totalWeight,
        title: val.title,
      });
    },
  });

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Card>
        <Card.Content style={{ gap: 16 }}>
          <TextInput
            disabled={isLoading}
            mode="outlined"
            label="Product title"
            error={!!formik.errors.title}
            onChange={(val) => {
              formik.setFieldValue('title', val.nativeEvent.text);
            }}
            value={formik.values.title.toString()}
          />
          <TextInput
            returnKeyType="done"
            keyboardType="numeric"
            mode="outlined"
            label="Total Recipe Weight"
            disabled={isLoading}
            error={!!formik.errors.totalWeight}
            onChange={(val) => {
              const totalWeight =
                val.nativeEvent.text === ''
                  ? 0
                  : parseFloat(val.nativeEvent.text.replaceAll(',', '.'));
              formik.setFieldValue('totalWeight', totalWeight);
            }}
            value={formik.values.totalWeight.toString()}
          />
          <HelperText type="error" visible={!!formik.errors.totalWeight}>
            {formik.errors.totalWeight}
          </HelperText>
        </Card.Content>
        <Card.Actions>
          <Button onPress={onCancel}>Cancel</Button>
          <Button loading={isLoading} disabled={isLoading} onPress={() => formik.handleSubmit()}>
            Create Product
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default RecipeWeightCard;
