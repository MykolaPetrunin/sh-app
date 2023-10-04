import { ProductRes } from '../intrfaces/productRes';
import { Product } from '../intrfaces/product';

export const productResToProduct = ({
  barcode,
  description,
  user_id,
  ...rest
}: ProductRes): Product => ({
  ...rest,
  userId: user_id,
  ...(barcode ? { barcode } : {}),
  ...(description ? { description } : {}),
});
