import { FC, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useProduct } from '../../models/product/useProduct';
import { ActivityIndicator, Modal, Portal, Searchbar } from 'react-native-paper';
import { Product } from '../../models/product/intrfaces/product';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { CalculatorStackParamList } from '../../navigation/CalculatorStack';
import { ProductCard } from '../../components/atoms/productCard/ProductCard';

export const ProductsScreen: FC = () => {
  const route = useRoute();

  const [productToAdd, setProductToAdd] = useState<Product | undefined>();

  const navigation = useNavigation<NavigationProp<CalculatorStackParamList>>();

  const { items: products } = useProduct({ isItemsEnabled: true });

  const [selectedProductsIds, setSelectedProductIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedProductIds((route.params as { selectedProducts?: string[] }).selectedProducts || []);
  }, [route.params]);

  const productPressHandler = (product: Product) => {
    setProductToAdd(product);
  };

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 20, maxHeight: '100%', gap: 16 }}
    >
      <Searchbar placeholder="Search" onChangeText={products.search} value={products.searchText} />
      <FlatList<Product>
        style={{ flex: 1 }}
        data={products.items.filter(({ id }) => !selectedProductsIds.includes(id))}
        onEndReached={products.fetchNextPage}
        onEndReachedThreshold={0.8}
        renderItem={(product) => (
          <ProductCard product={product.item} key={product.item.id} onPress={productPressHandler} />
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
              add={(product) => navigation.navigate('Calculator', { product })}
            />
          )}
        </Modal>
      </Portal>
    </View>
  );
};
