import React, { FC, ReactElement } from 'react';
import { Button, Card, DataTable, HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { productCardValidation } from './validations/productCardValidation';
import { ProductCardData } from './interfaces/productCardData';

interface ProductCardProps {
  product: ProductCardData;
  onPress?: (product: ProductCardData) => void;
  add?: (product: ProductCardData) => void;
  cancel?: () => void;
  actions?: ReactElement;
  onQuantityChange?: (product: ProductCardData) => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  onQuantityChange,
  actions,
  product,
  cancel,
  add,
  onPress,
}) => {
  const formik = useFormik<{ quantity: number }>({
    initialValues: { quantity: product.quantity || 0 },
    validationSchema: productCardValidation,
    onSubmit: (val) => {
      if (!add) return;

      add({
        ...product,
        ...val,
      });
    },
  });

  return (
    <View style={{ padding: 4 }}>
      <Card onPress={onPress ? () => onPress(product) : undefined}>
        <Card.Title title={product.title} right={() => actions} />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title numeric>Carbs</DataTable.Title>
              <DataTable.Title numeric>Fat</DataTable.Title>
              <DataTable.Title numeric>Proteins</DataTable.Title>
              <DataTable.Title numeric>Calories</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell numeric>{product.carbohydrates.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell numeric>{product.fats.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell numeric>{product.proteins.toFixed(2)}</DataTable.Cell>
              <DataTable.Cell numeric>{product.calories.toFixed(2)}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          {(add || product.quantity !== undefined) && (
            <>
              <TextInput
                returnKeyType="done"
                keyboardType="numeric"
                mode="outlined"
                error={!!formik.errors.quantity}
                onChange={(val) => {
                  const quantity =
                    val.nativeEvent.text === ''
                      ? 0
                      : parseFloat(val.nativeEvent.text.replaceAll(',', '.'));
                  onQuantityChange && onQuantityChange({ ...product, quantity });
                  formik.setFieldValue('quantity', quantity);
                }}
                value={formik.values.quantity.toString()}
              />
              <HelperText type="error" visible={!!formik.errors.quantity}>
                {formik.errors.quantity}
              </HelperText>
            </>
          )}
        </Card.Content>
        {(cancel || add) && (
          <Card.Actions>
            {cancel && <Button onPress={cancel}>Cancel</Button>}
            {add && <Button onPress={() => formik.handleSubmit()}>Add</Button>}
          </Card.Actions>
        )}
      </Card>
    </View>
  );
};
