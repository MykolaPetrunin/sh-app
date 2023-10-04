import { Product } from './product';

export type CreateProductProps = Partial<
  Omit<Product, 'id' | 'updated_at' | 'created_at' | 'calories' | 'userId' | 'quantity'>
>;
