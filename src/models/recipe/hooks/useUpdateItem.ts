import { useUpdateRecipeMutation } from '../api/useUpdateRecipeMutation';
import { Recipe } from '../intrfaces/recipe';
import { UpdateRecipeProps } from '../intrfaces/updateRecipeProps';

export interface UseUpdateItemRes {
  isLoading: boolean;
  update: (item: UpdateRecipeProps) => Promise<Recipe>;
}

export const useUpdateItem = (): UseUpdateItemRes => {
  const { isLoading, mutateAsync } = useUpdateRecipeMutation(['UpdateProductMutation']);

  const update = async (item: UpdateRecipeProps): Promise<Recipe> => {
    console.log(item, 'jghkkjk');
    return await mutateAsync(item);
  };

  return { isLoading, update };
};
