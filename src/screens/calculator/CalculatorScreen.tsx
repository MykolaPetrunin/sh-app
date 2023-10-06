import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CalculatorStackParamList } from '../../navigation/CalculatorStack';
import { Product } from '../../models/product/intrfaces/product';
import { ProductCard } from '../../components/atoms/productCard/ProductCard';
import { Macronutrients } from './interfaces/macronutrients';
import { calculateMacronutrients } from './utils/calculateMacronutrients';

export const CalculatorScreen: FC = () => {
  const route = useRoute<RouteProp<CalculatorStackParamList, 'Calculator'>>();
  const navigation = useNavigation<NavigationProp<CalculatorStackParamList>>();

  const [products, setProducts] = useState<Product[]>([]);

  const [macronutrients, setMacronutrients] = useState<Macronutrients>(
    calculateMacronutrients(products),
  );

  useEffect(() => {
    setMacronutrients(calculateMacronutrients(products));
  }, [products]);

  useEffect(() => {
    const product = route.params?.product;
    if (!product) return;

    setProducts((prevState) => [...prevState, product]);
  }, [route.params]);

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={{ flex: 1, paddingHorizontal: 16, gap: 24 }}>
        <View style={{ gap: 8 }}>
          <Card>
            <Card.Title
              titleVariant="titleLarge"
              title="Carbs"
              subtitle={<Text variant="bodyLarge">{macronutrients.carbohydrates.toFixed(2)}</Text>}
            />
          </Card>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Card style={{ flex: 1 }}>
              <Card.Title
                titleVariant="titleMedium"
                title="Proteins"
                subtitle={<Text variant="bodyMedium">{macronutrients.proteins.toFixed(2)}</Text>}
              />
            </Card>
            <Card style={{ flex: 1 }}>
              <Card.Title
                titleVariant="titleMedium"
                title="Fats"
                subtitle={<Text variant="bodyMedium">{macronutrients.fats.toFixed(2)}</Text>}
              />
            </Card>
            <Card style={{ flex: 1 }}>
              <Card.Title
                titleVariant="titleMedium"
                title="Calories"
                subtitle={<Text variant="bodyMedium">{macronutrients.calories.toFixed(2)}</Text>}
              />
            </Card>
          </View>
        </View>
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
                selectedProducts: products.map(({ id }) => id),
                parentStack: 'Calculator',
              })
            }
          >
            Add Product
          </Button>
          <Button style={{ flex: 1 }} icon="broom" mode="elevated" onPress={() => setProducts([])}>
            Clean up
          </Button>
        </View>
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <View style={{ gap: 24 }}>
            <View style={{ width: '100%' }}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuantityChange={(newProduct) => {
                    setProducts((prevState) =>
                      prevState.map((item) =>
                        item.id === newProduct.id
                          ? { ...newProduct, userId: '', created_at: '', updated_at: '' }
                          : item,
                      ),
                    );
                  }}
                  actions={
                    <IconButton
                      icon="trash-can-outline"
                      onPress={() =>
                        setProducts((prevState) =>
                          prevState.filter((item) => item.id !== product.id),
                        )
                      }
                    />
                  }
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
