export interface UpdateRecipeProps {
  id: string;
  title?: string;
  products?: {
    productId: string;
    quantity: number;
  }[];
}
