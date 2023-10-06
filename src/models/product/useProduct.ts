import { useItems, UseItemsRes } from './hooks/useItems';
import { useRemoveItem, UseRemoveItemRes } from './hooks/useRemoveItem';
import { useCreateItem, UseCreateItemRes } from './hooks/useCreateItem';
import { useUpdateItem, UseUpdateItemRes } from './hooks/useUpdateItem';
import {
  useCreateProductFromRecipe,
  UseCreateProductFromRecipeRes,
} from './hooks/useCreateProductFromRecipe';

interface ProductModel {
  items: UseItemsRes;
  createItem: UseCreateItemRes;
  removeItem: UseRemoveItemRes;
  updateItem: UseUpdateItemRes;
  createProductFromRecipe: UseCreateProductFromRecipeRes;
}
interface UseProductProps {
  isItemsEnabled?: boolean;
}

export const useProduct = ({ isItemsEnabled = false }: UseProductProps): ProductModel => {
  const items = useItems({ isEnabled: isItemsEnabled });
  const createItem = useCreateItem();
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();
  const createProductFromRecipe = useCreateProductFromRecipe();

  return {
    items,
    updateItem,
    removeItem,
    createItem,
    createProductFromRecipe,
  };
};
