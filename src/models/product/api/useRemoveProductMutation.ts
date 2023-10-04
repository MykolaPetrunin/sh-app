import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';

export const useRemoveProductMutation = mutationBuilder<{ itemId: string }>({
  path: (data) => `/products/${data.itemId}`,
  method: MutationMethods.DELETE,
  resTransformer: (data) => data,
});
