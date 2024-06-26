import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useProduct } from '../../models/product/useProduct';
import {
  ActivityIndicator,
  Button,
  Card,
  Menu,
  Modal,
  Portal,
  Searchbar,
} from 'react-native-paper';
import { Product } from '../../models/product/intrfaces/product';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CalculatorStackParamList } from '../../navigation/CalculatorStack';
import { ProductCard } from '../../components/atoms/productCard/ProductCard';
import { CustomMenu, CustomMenuRefObj } from '../../components/atoms/customMenu/CustomMenu';
import { RecipesStackParamList } from '../../navigation/RecipesStack';
import { ProductCardData } from '../../components/atoms/productCard/interfaces/productCardData';

export const ProductsScreen: FC = () => {
  const menuRef = useRef<CustomMenuRefObj>(null);

  const route = useRoute<RouteProp<CalculatorStackParamList | RecipesStackParamList, 'Products'>>();

  const [productToAdd, setProductToAdd] = useState<Product | undefined>();

  const navigation =
    useNavigation<NavigationProp<CalculatorStackParamList | RecipesStackParamList>>();

  const { items: products, removeItem: removeProductProps } = useProduct({ isItemsEnabled: true });

  const [productToDelete, setProductToDelete] = useState<Product | undefined>();

  useEffect(() => {
    if (!route.params?.newProduct) return;
    products.refetch();
  }, [route.params?.newProduct]);

  useEffect(() => {
    if (!route.params?.updatedProduct) return;
    products.updateItem(route.params.updatedProduct);
  }, [route.params?.updatedProduct]);

  const productPressHandler = (product: ProductCardData) => {
    setProductToAdd({ ...product, userId: '', created_at: '', updated_at: '' });
  };

  const recipe = useMemo(() => route.params.recipe, [route.params.recipe]);

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 20, maxHeight: '100%', gap: 16 }}
    >
      <Searchbar placeholder="Search" onChangeText={products.search} value={products.searchText} />
      <Button
        icon="plus"
        mode="elevated"
        onPress={() =>
          navigation.navigate(recipe ? 'RecipesStack' : 'CalculatorStack', {
            screen: 'Product',
            params: {
              ...(recipe ? { recipe } : {}),
            },
          })
        }
      >
        Create Product
      </Button>
      <FlatList<Product>
        style={{ flex: 1 }}
        data={products.items.filter(
          ({ id }) => !(route.params?.selectedProducts || []).includes(id),
        )}
        onEndReached={products.fetchNextPage}
        onEndReachedThreshold={0.8}
        renderItem={(product) => (
          <ProductCard
            actions={
              <CustomMenu ref={menuRef}>
                <Menu.Item
                  onPress={() => {
                    if (menuRef.current) menuRef.current.closeMenu();
                    navigation.navigate(recipe ? 'RecipesStack' : 'CalculatorStack', {
                      screen: 'Product',
                      params: { product: product.item, ...(recipe ? { recipe } : {}) },
                    });
                  }}
                  title="Edit"
                  leadingIcon="square-edit-outline"
                />
                <Menu.Item
                  onPress={() => {
                    if (menuRef.current) menuRef.current.closeMenu();
                    setProductToDelete(product.item);
                  }}
                  title="Delete"
                  leadingIcon="trash-can-outline"
                />
              </CustomMenu>
            }
            product={product.item}
            key={product.item.id}
            onPress={productPressHandler}
          />
        )}
        ListFooterComponent={
          products.isFetchingNextPage ? (
            <View style={{ padding: 10 }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
      <Portal>
        <Modal visible={!!productToAdd} onDismiss={() => setProductToAdd(undefined)}>
          {productToAdd && (
            <ProductCard
              product={productToAdd}
              cancel={() => setProductToAdd(undefined)}
              add={(product) => {
                navigation.navigate(recipe ? 'RecipesStack' : 'CalculatorStack', {
                  screen: route.params.parentStack,
                  params: { product, ...(recipe ? { recipe } : {}) },
                });
                setProductToAdd(undefined);
              }}
            />
          )}
        </Modal>
        <Modal visible={!!productToDelete} onDismiss={() => setProductToDelete(undefined)}>
          <View style={{ paddingHorizontal: 16 }}>
            <Card>
              <Card.Title title={`Are you sure you want to delete ${productToDelete?.title}`} />
              <Card.Actions>
                <Button onPress={() => setProductToDelete(undefined)}>Cancel</Button>
                <Button
                  buttonColor="#ff0000"
                  loading={removeProductProps.isLoading}
                  onPress={async () => {
                    await removeProductProps.remove(productToDelete!.id);
                    setProductToDelete(undefined);
                    products.removeItem(productToDelete!.id);
                  }}
                >
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
