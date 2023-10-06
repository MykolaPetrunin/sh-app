import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';

export const useRemoveRecipeMutation = mutationBuilder<{ itemId: string }>({
  path: (data) => `/recipes/${data.itemId}`,
  method: MutationMethods.DELETE,
  resTransformer: (data) => data,
});
