import { useItems, UseItemsRes } from './hooks/useItems';

interface ProductModel {
  items: UseItemsRes;
}
interface UseProductProps {
  isItemsEnabled?: boolean;
}

export const useProduct = ({ isItemsEnabled = false }: UseProductProps): ProductModel => {
  const items = useItems({ isEnabled: isItemsEnabled });

  return {
    items,
  };
};
