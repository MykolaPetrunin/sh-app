import { RecipeProduct } from '../interfaces/recipeProduct';

interface GetProductFromRecipeProps {
  products: RecipeProduct[];
  totalWeight?: number;
}

export const getProductFromRecipe = ({
  totalWeight,
  products,
}: GetProductFromRecipeProps): {
  proteins: number;
  fats: number;
  calories: number;
  carbohydrates: number;
} => {
  let totalProteins = 0;
  let totalFats = 0;
  let totalCarbs = 0;
  let totalQuantity = 0;

  for (const product of products) {
    const factor = product.quantity / 100;
    totalQuantity += product.quantity!;
    totalProteins += product.proteins * factor;
    totalFats += product.fats * factor;
    totalCarbs += product.carbohydrates * factor;
  }

  if (totalWeight) totalQuantity = totalWeight;

  const proteinsPer100g = (totalProteins / totalQuantity) * 100;
  const fatsPer100g = (totalFats / totalQuantity) * 100;
  const carbsPer100g = (totalCarbs / totalQuantity) * 100;

  return {
    fats: fatsPer100g,
    calories: fatsPer100g * 9 + carbsPer100g * 4 + proteinsPer100g * 4,
    carbohydrates: carbsPer100g,
    proteins: proteinsPer100g,
  };
};
