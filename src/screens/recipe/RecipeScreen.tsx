import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, HelperText, IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import { RecipeFormData } from './interfaces/recipeFormData';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RecipesStackParamList } from '../../navigation/RecipesStack';
import { CalculatorStackParamList } from '../../navigation/CalculatorStack';
import { recipeValidation } from './validations/recipeValidation';
import { useRecipe } from '../../models/recipe/useRecipe';
import { PageLoader } from '../../components/atoms/pageLoader/PageLoader';
import { ProductCard } from '../../components/atoms/productCard/ProductCard';
import RecipeWeightCard from '../../components/atoms/recipeWeightCard/RecipeWeightCard';
import { Recipe } from '../../models/recipe/intrfaces/recipe';

export const RecipeScreen: FC = () => {
  const route = useRoute<RouteProp<RecipesStackParamList, 'Recipe'>>();

  const navigation =
    useNavigation<NavigationProp<CalculatorStackParamList | RecipesStackParamList>>();

  const [recipeToCreate, setRecipeToCreate] = useState<Recipe | undefined>();

  const recipeFromRoutes = route.params.recipe;

  const recipe = useRecipe({ itemId: route.params.recipe?.id });

  const formik = useFormik<RecipeFormData>({
    initialValues: {
      title: '',
      products: [],
    },
    validationSchema: recipeValidation,
    onSubmit: async (val) => {
      const normalizedRecipe = {
        title: val.title,
        products: val.products.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        })),
      };

      if (recipeFromRoutes) {
        const updatedRecipe = await recipe.updateItem.update({
          id: recipeFromRoutes.id,
          ...normalizedRecipe,
        });
        navigation.navigate('Recipes', { updatedRecipe });
        return;
      }

      const newRecipe = await recipe.createItem.crete(normalizedRecipe);

      navigation.navigate('Recipes', { newRecipe });
    },
  });

  useEffect(() => {
    const product = route.params?.product;
    if (!product) return;

    formik.setFieldValue('products', [
      ...formik.values.products,
      {
        id: product.id,
        title: product.title,
        quantity: product.quantity,
        fats: product.fats,
        carbohydrates: product.carbohydrates,
        proteins: product.proteins,
        calories: product.calories,
      },
    ]);
  }, [route.params]);

  useEffect(() => {
    if (!recipe.item.item) return;

    formik.setValues({
      title: recipe.item.item.title,
      products: recipe.item.item.products || [],
    });
  }, [recipe.item.item]);

  return (
    <ScrollView>
      {recipe.item.isLoading && <PageLoader />}
      {!recipe.item.isLoading && (
        <View style={{ paddingHorizontal: 16, paddingVertical: 20, gap: 16 }}>
          {recipeFromRoutes && formik.isValid && (
            <Button
              style={{ flex: 1 }}
              onPress={() =>
                setRecipeToCreate({
                  ...route.params.recipe!,
                  title: formik.values.title,
                  products: formik.values.products,
                })
              }
              mode="elevated"
            >
              Create Product from Recipe
            </Button>
          )}
          <Card>
            <Card.Content style={{ gap: 12 }}>
              <TextInput
                mode="outlined"
                label="Recipe title"
                error={!!formik.errors.title}
                onChange={(val) => {
                  formik.setFieldValue('title', val.nativeEvent.text);
                }}
                value={formik.values.title.toString()}
              />
            </Card.Content>
          </Card>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 8,
            }}
          >
            <Button
              icon="plus"
              mode="elevated"
              style={{ flex: 1 }}
              onPress={() =>
                navigation.navigate('Products', {
                  selectedProducts: formik.values.products.map(({ id }) => id),
                  parentStack: 'Recipe',
                })
              }
            >
              Add Product
            </Button>
            <Button
              style={{ flex: 1 }}
              icon="broom"
              mode="elevated"
              onPress={() => formik.setFieldValue('products', [])}
            >
              Clean up
            </Button>
          </View>
          <View>
            <Button
              icon="plus"
              mode="elevated"
              onPress={() =>
                navigation.navigate('Products', {
                  selectedProducts: formik.values.products.map(({ id }) => id),
                  parentStack: 'Recipe',
                })
              }
            >
              Add Product
            </Button>
          </View>
          <View style={{ gap: 24 }}>
            <View style={{ width: '100%' }}>
              <HelperText
                type="error"
                visible={!!formik.errors.products && typeof formik.errors.products === 'string'}
              >
                {formik.errors.products?.toString() || ''}
              </HelperText>

              {formik.values.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuantityChange={(newProduct) => {
                    formik.setFieldValue(
                      'products',
                      formik.values.products.map((item) =>
                        item.id === newProduct.id ? newProduct : item,
                      ),
                    );
                  }}
                  actions={
                    <IconButton
                      icon="trash-can-outline"
                      onPress={() =>
                        formik.setFieldValue(
                          'products',
                          formik.values.products.filter((item) => item.id !== product.id),
                        )
                      }
                    />
                  }
                />
              ))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Button style={{ flex: 1 }} onPress={() => formik.handleSubmit()} mode="elevated">
              {recipeFromRoutes ? 'Update' : 'Create'}
            </Button>
          </View>
        </View>
      )}
      <Portal>
        <Modal visible={!!recipeToCreate} onDismiss={() => setRecipeToCreate(undefined)}>
          {!!recipeToCreate && (
            <RecipeWeightCard
              onSubmit={(val) => {
                console.log(val);
              }}
              recipe={recipeToCreate}
              onCancel={() => setRecipeToCreate(undefined)}
            />
          )}
        </Modal>
      </Portal>
    </ScrollView>
  );
};
