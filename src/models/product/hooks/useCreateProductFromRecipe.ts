import { useCreateProductFromRecipeMutation } from '../api/useCreateProductFromRecipeMutation';
import { Product } from '../intrfaces/product';

interface Props {
  recipeId: string;
  title: string;
  totalWeight?: number;
}

export interface UseCreateProductFromRecipeRes {
  isLoading: boolean;
  cerate: (props: Props) => Promise<Product>;
}

export const useCreateProductFromRecipe = (): UseCreateProductFromRecipeRes => {
  const { isLoading, mutateAsync } = useCreateProductFromRecipeMutation([
    'CreateProductFromRecipeMutation',
  ]);

  const cerate = (props: Props) => {
    return mutateAsync(props);
  };

  return {
    cerate,
    isLoading,
  };
};
