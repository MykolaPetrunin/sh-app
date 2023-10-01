import { ProductRes } from '../intrfaces/productRes';
import { Product } from '../intrfaces/product';

export const productResToProduct = ({ barcode, description, ...rest }: ProductRes): Product => ({
  ...rest,
  ...(barcode ? { barcode } : {}),
  ...(description ? { description } : {}),
});
