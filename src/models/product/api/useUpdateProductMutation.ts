import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import { Product } from '../intrfaces/product';
import { productResToProduct } from '../utils/productResToProduct';
import { ProductRes } from '../intrfaces/productRes';
import { UpdateProductProps } from '../intrfaces/updateProductProps';

type Body = Omit<UpdateProductProps, 'id'>;

export const useUpdateProductMutation = mutationBuilder<
  UpdateProductProps,
  Product,
  ProductRes,
  Body
>({
  path: (source) => `/products/${source.id}`,
  method: MutationMethods.PATCH,
  resTransformer: productResToProduct,
  propsTransformer: (source) => ({
    ...(source.title ? { title: source.title } : {}),
    ...(source.proteins ? { proteins: source.proteins } : {}),
    ...(source.fats ? { fats: source.fats } : {}),
    ...(source.carbohydrates ? { carbohydrates: source.carbohydrates } : {}),
    ...(source.description ? { description: source.description } : {}),
    ...(source.barcode ? { barcode: source.barcode } : {}),
  }),
});
