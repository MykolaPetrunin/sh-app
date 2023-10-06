export interface CreateRecipeProps {
  title: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}
