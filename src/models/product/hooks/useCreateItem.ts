import { useCreateProductMutation } from '../api/useCreateProductMutation';
import { Product } from '../intrfaces/product';
import { CreateProductProps } from '../intrfaces/createProductProps';

export interface UseCreateItemRes {
  isLoading: boolean;
  crete: (item: CreateProductProps) => Promise<Product>;
}
export const useCreateItem = (): UseCreateItemRes => {
  const { isLoading, mutateAsync } = useCreateProductMutation(['CreateProductMutation']);

  const crete = (item: CreateProductProps): Promise<Product> => {
    return mutateAsync(item);
  };

  return { isLoading, crete };
};
