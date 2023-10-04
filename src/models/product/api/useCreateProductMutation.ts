import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import { CreateProductProps } from '../intrfaces/createProductProps';
import { Product } from '../intrfaces/product';
import { ProductRes } from '../intrfaces/productRes';
import { productResToProduct } from '../utils/productResToProduct';

export const useCreateProductMutation = mutationBuilder<
  CreateProductProps,
  Product,
  ProductRes,
  CreateProductProps
>({
  path: '/products',
  method: MutationMethods.POST,
  resTransformer: productResToProduct,
  propsTransformer: ({ description, barcode, ...rest }) => ({
    ...rest,
    ...(description ? { description } : {}),
    ...(barcode ? { barcode } : {}),
  }),
});
