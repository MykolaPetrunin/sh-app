import React, { FC } from 'react';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CalculatorStackParamList } from '../../navigation/CalculatorStack';
import { useFormik } from 'formik';
import { View } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import { ProductFormData } from './interfaces/productFormData';
import { productValidation } from './validations/productValidation';
import { useProduct } from '../../models/product/useProduct';

export const ProductScreen: FC = () => {
  const route = useRoute<RouteProp<CalculatorStackParamList, 'Product'>>();
  const productFromRoutes = route.params.product;
  const product = useProduct({});
  const navigation = useNavigation<NavigationProp<CalculatorStackParamList>>();

  const formik = useFormik<ProductFormData>({
    initialValues: {
      title: productFromRoutes?.title || '',
      fats: productFromRoutes?.fats.toString() || '',
      carbohydrates: productFromRoutes?.carbohydrates.toString() || '',
      proteins: productFromRoutes?.proteins.toString() || '',
    },
    validationSchema: productValidation,
    onSubmit: async (val) => {
      const normalizedVal = {
        title: val.title,
        fats: parseFloat(val.fats.replace(',', '.')),
        proteins: parseFloat(val.proteins.replace(',', '.')),
        carbohydrates: parseFloat(val.carbohydrates.replace(',', '.')),
      };

      if (productFromRoutes) {
        const updatedProduct = await product.updateItem.update({
          id: productFromRoutes.id,
          ...normalizedVal,
        });
        navigation.navigate('Products', { updatedProduct, parentStack: 'Calculator' });
        return;
      }
      const newProduct = await product.createItem.crete(normalizedVal);
      navigation.navigate('Products', { newProduct, parentStack: 'Calculator' });
    },
  });

  const isLoading = product.createItem.isLoading || product.updateItem.isLoading;

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 20, gap: 16 }}>
      <Card>
        <Card.Content style={{ gap: 12 }}>
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
            label="Carbohydrates"
            disabled={isLoading}
            error={!!formik.errors.carbohydrates}
            onChange={(val) => {
              formik.setFieldValue('carbohydrates', val.nativeEvent.text.replace(',', '.'));
            }}
            value={formik.values.carbohydrates.toString()}
          />
          <TextInput
            returnKeyType="done"
            keyboardType="numeric"
            mode="outlined"
            label="Fats"
            disabled={isLoading}
            error={!!formik.errors.fats}
            onChange={(val) => {
              formik.setFieldValue('fats', val.nativeEvent.text.replace(',', '.'));
            }}
            value={formik.values.fats.toString()}
          />
          <TextInput
            returnKeyType="done"
            keyboardType="numeric"
            mode="outlined"
            label="Proteins"
            disabled={isLoading}
            error={!!formik.errors.proteins}
            onChange={(val) => {
              formik.setFieldValue('proteins', val.nativeEvent.text.replace(',', '.'));
            }}
            value={formik.values.proteins.toString()}
          />
        </Card.Content>
      </Card>
      <Button onPress={() => formik.handleSubmit()} mode="elevated" loading={isLoading}>
        {productFromRoutes ? 'Update' : 'Create'}
      </Button>
    </View>
  );
};
