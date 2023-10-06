import { Recipe } from '../intrfaces/recipe';
import { useRecipeQuery } from '../api/useRecipeQuery';

export interface UseItemRes {
  item?: Recipe;
  isLoading: boolean;
}

interface UseItemProps {
  itemId?: string;
}

export const useItem = ({ itemId }: UseItemProps): UseItemRes => {
  const { isInitialLoading, data } = useRecipeQuery({
    keys: ['RecipeQuery', itemId],
    isEnabled: !!itemId,
    data: {
      id: itemId || '',
    },
  });

  return {
    isLoading: isInitialLoading,
    item: data,
  };
};
