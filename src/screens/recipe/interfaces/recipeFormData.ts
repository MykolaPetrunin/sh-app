import { RecipeProduct } from '../../../models/recipe/intrfaces/recipeProduct';

export interface RecipeFormData {
  title: string;
  products: RecipeProduct[];
}
