import { useRemoveRecipeMutation } from '../api/useRemoveRecipeMutation';

export interface UseRemoveItemRes {
  isLoading: boolean;
  remove: (itemId: string) => Promise<void>;
}
export const useRemoveItem = (): UseRemoveItemRes => {
  const { mutateAsync, isLoading } = useRemoveRecipeMutation(['RemoveProductMutation']);

  const remove = async (itemId: string) => {
    await mutateAsync({ itemId });
  };

  return {
    isLoading,
    remove,
  };
};
