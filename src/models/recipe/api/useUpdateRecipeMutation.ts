import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import { UpdateRecipeProps } from '../intrfaces/updateRecipeProps';

interface Body {
  title?: string;
  products?: {
    product_id: string;
    quantity: number;
  }[];
}

export const useUpdateRecipeMutation = mutationBuilder<UpdateRecipeProps, unknown, unknown, Body>({
  path: (source) => `/recipes/${source.id}`,
  method: MutationMethods.PATCH,
  resTransformer: (res) => res,
  propsTransformer: (source) => ({
    ...(source.title ? { title: source.title } : {}),
    ...(source.products
      ? {
          products: source.products.map(({ productId, quantity }) => ({
            product_id: productId,
            quantity,
          })),
        }
      : {}),
  }),
});
