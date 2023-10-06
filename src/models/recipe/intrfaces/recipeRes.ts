export interface RecipeRes {
  id: string;
  title: string;
  user_id: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  products: {
    id: string;
    title: string;
    proteins: number;
    carbohydrates: number;
    fats: number;
    product_info: {
      quantity: number;
    };
  }[];
}
