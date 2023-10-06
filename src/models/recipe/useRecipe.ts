import { useItems, UseItemsRes } from './hooks/useItems';
import { useRemoveItem, UseRemoveItemRes } from './hooks/useRemoveItem';
import { useCreateItem, UseCreateItemRes } from './hooks/useCreateItem';
import { useUpdateItem, UseUpdateItemRes } from './hooks/useUpdateItem';
import { useItem, UseItemRes } from './hooks/useItem';

interface RecipeModel {
  item: UseItemRes;
  items: UseItemsRes;
  createItem: UseCreateItemRes;
  removeItem: UseRemoveItemRes;
  updateItem: UseUpdateItemRes;
}
interface UseRecipeProps {
  isItemsEnabled?: boolean;
  itemId?: string;
}

export const useRecipe = ({ isItemsEnabled = false, itemId }: UseRecipeProps): RecipeModel => {
  const item = useItem({ itemId });
  const items = useItems({ isEnabled: isItemsEnabled });
  const createItem = useCreateItem();
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();

  return {
    item,
    items,
    updateItem,
    removeItem,
    createItem,
  };
};
