import { Product } from './product';

export type UpdateProductProps = Partial<
  Omit<Product, 'id' | 'updated_at' | 'created_at' | 'calories' | 'userId' | 'quantity'>
> & { id: string };
