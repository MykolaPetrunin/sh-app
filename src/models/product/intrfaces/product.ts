export interface Product {
  id: string;
  proteins: number;
  carbohydrates: number;
  fats: number;
  title: string;
  user_id: string;
  barcode?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  calories: number;
  quantity?: number;
}
