import { useCreateRecipeMutation } from '../api/useCreateRecipeMutation';
import { Recipe } from '../intrfaces/recipe';
import { CreateRecipeProps } from '../intrfaces/createRecipeProps';

export interface UseCreateItemRes {
  isLoading: boolean;
  crete: (item: CreateRecipeProps) => Promise<Recipe>;
}
export const useCreateItem = (): UseCreateItemRes => {
  const { isLoading, mutateAsync } = useCreateRecipeMutation(['CreateRecipeMutation']);

  const crete = (item: CreateRecipeProps): Promise<Recipe> => {
    return mutateAsync(item);
  };

  return { isLoading, crete };
};
