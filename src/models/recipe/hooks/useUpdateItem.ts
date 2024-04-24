import { useUpdateRecipeMutation } from '../api/useUpdateRecipeMutation';
import { UpdateRecipeProps } from '../intrfaces/updateRecipeProps';

export interface UseUpdateItemRes {
  isLoading: boolean;
  update: (item: UpdateRecipeProps) => Promise<void>;
}

export const useUpdateItem = (): UseUpdateItemRes => {
  const { isLoading, mutateAsync } = useUpdateRecipeMutation(['UpdateProductMutation']);

  const update = async (item: UpdateRecipeProps): Promise<void> => {
    console.log(item, 'item in useUpdateItem');
    await mutateAsync(item);
  };

  return { isLoading, update };
};
