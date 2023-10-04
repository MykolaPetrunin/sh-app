import { useItems, UseItemsRes } from './hooks/useItems';
import { useRemoveItem, UseRemoveItemRes } from './hooks/useRemoveItem';
import { useCreateItem, UseCreateItemRes } from './hooks/useCreateItem';
import { useUpdateItem, UseUpdateItemRes } from './hooks/useUpdateItem';

interface ProductModel {
  items: UseItemsRes;
  createItem: UseCreateItemRes;
  removeItem: UseRemoveItemRes;
  updateItem: UseUpdateItemRes;
}
interface UseProductProps {
  isItemsEnabled?: boolean;
}

export const useProduct = ({ isItemsEnabled = false }: UseProductProps): ProductModel => {
  const items = useItems({ isEnabled: isItemsEnabled });
  const createItem = useCreateItem();
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();

  return {
    items,
    updateItem,
    removeItem,
    createItem,
  };
};
