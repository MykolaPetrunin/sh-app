import { useUpdateProductMutation } from '../api/useUpdateProductMutation';
import { Product } from '../intrfaces/product';
import { UpdateProductProps } from '../intrfaces/updateProductProps';

export interface UseUpdateItemRes {
  isLoading: boolean;
  update: (item: UpdateProductProps) => Promise<Product>;
}

export const useUpdateItem = (): UseUpdateItemRes => {
  const { isLoading, mutateAsync } = useUpdateProductMutation(['UpdateProductMutation']);

  const update = async (item: UpdateProductProps): Promise<Product> => {
    return await mutateAsync(item);
  };

  return { isLoading, update };
};
