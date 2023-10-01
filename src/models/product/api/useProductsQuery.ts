import infiniteQueryBuilder from '../../../query/utils/infiniteQueryBuilder';
import { InfiniteRes } from '../../../query/interfaces/infiniteRes';
import { ProductRes } from '../intrfaces/productRes';
import { Product } from '../intrfaces/product';
import { productResToProduct } from '../utils/productResToProduct';
import { ItemsBody } from '../../../query/interfaces/itemsBody';

export const useProductsQuery = infiniteQueryBuilder<
  InfiniteRes<Product>,
  InfiniteRes<ProductRes>,
  ItemsBody,
  ItemsBody
>({
  path: '/products',
  resTransformer: (source) => ({
    ...source,
    data: source.data.map(productResToProduct),
  }),
  propsTransformer: (data, pageParams) => ({
    ...data,
    cursor: pageParams as string,
  }),
});
