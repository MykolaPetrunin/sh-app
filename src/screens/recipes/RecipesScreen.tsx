import React, { FC, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
  Modal,
  Portal,
  Searchbar,
} from 'react-native-paper';
import { Recipe } from '../../models/recipe/intrfaces/recipe';
import { RecipesStackParamList } from '../../navigation/RecipesStack';
import { useRecipe } from '../../models/recipe/useRecipe';
import { RecipeCard } from '../../components/atoms/recipeCard/RecipeCard';

export const RecipesScreen: FC = () => {
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | undefined>();

  const navigation = useNavigation<NavigationProp<RecipesStackParamList>>();

  const route = useRoute<RouteProp<RecipesStackParamList, 'Recipes'>>();

  const recipe = useRecipe({ isItemsEnabled: true });

  useEffect(() => {
    if (!route.params?.newRecipe) return;
    recipe.items.refetch();
  }, [route.params?.newRecipe]);

  useEffect(() => {
    if (!route.params?.updatedRecipe) return;

    recipe.items.updateItem(route.params.updatedRecipe);
  }, [route.params?.updatedRecipe]);

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View
        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 20, maxHeight: '100%', gap: 16 }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={recipe.items.search}
          value={recipe.items.searchText}
        />
        <Button icon="plus" mode="elevated" onPress={() => navigation.navigate('Recipe', {})}>
          Create Recipe
        </Button>
        <FlatList<Recipe>
          style={{ flex: 1 }}
          data={recipe.items.items}
          onEndReached={recipe.items.fetchNextPage}
          onEndReachedThreshold={0.8}
          renderItem={(recipeData) => (
            <RecipeCard
              onPress={() => navigation.navigate('Recipe', { recipe: recipeData.item })}
              key={recipeData.item.id}
              recipe={recipeData.item}
              actions={
                <IconButton
                  icon="trash-can-outline"
                  onPress={() => setRecipeToDelete(recipeData.item)}
                />
              }
            />
          )}
          ListFooterComponent={
            recipe.items.isFetchingNextPage ? (
              <View style={{ padding: 10 }}>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      </View>
      <Portal>
        <Modal visible={!!recipeToDelete} onDismiss={() => setRecipeToDelete(undefined)}>
          <View style={{ paddingHorizontal: 16 }}>
            <Card>
              <Card.Title title={`Are you sure you want to delete ${recipeToDelete?.title}`} />
              <Card.Actions>
                <Button onPress={() => setRecipeToDelete(undefined)}>Cancel</Button>
                <Button
                  buttonColor="#ff0000"
                  loading={recipe.removeItem.isLoading}
                  onPress={async () => {
                    await recipe.removeItem.remove(recipeToDelete!.id);
                    setRecipeToDelete(undefined);
                    recipe.items.removeItem(recipeToDelete!.id);
                  }}
                >
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};
