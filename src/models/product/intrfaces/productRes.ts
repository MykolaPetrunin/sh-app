export interface ProductRes {
  id: string;
  proteins: number;
  carbohydrates: number;
  fats: number;
  title: string;
  user_id: string;
  barcode: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  calories: number;
}
