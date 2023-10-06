import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import { ProductRes } from '../intrfaces/productRes';
import { Product } from '../intrfaces/product';
import { productResToProduct } from '../utils/productResToProduct';

interface UseCreateProductFromRecipeMutationProps {
  recipeId: string;
  title: string;
  description?: string;
  totalWeight?: number;
}

export const useCreateProductFromRecipeMutation = mutationBuilder<
  UseCreateProductFromRecipeMutationProps,
  Product,
  ProductRes,
  UseCreateProductFromRecipeMutationProps
>({
  path: '/products/create-product-from-recipe',
  propsTransformer: ({ description, totalWeight, ...rest }) => ({
    ...rest,
    ...(description ? { description } : {}),
    ...(totalWeight ? { totalWeight } : {}),
  }),
  method: MutationMethods.POST,
  resTransformer: productResToProduct,
});
