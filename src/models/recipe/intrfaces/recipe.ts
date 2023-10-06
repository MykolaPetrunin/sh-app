import { RecipeProduct } from './recipeProduct';

export interface Recipe {
  id: string;
  title: string;
  userId: string;
  products?: RecipeProduct[];
  description?: string;
  created_at: string;
  updated_at: string;
}
