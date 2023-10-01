import { Product } from '../../../models/product/intrfaces/product';
import { Macronutrients } from '../interfaces/macronutrients';

export const calculateMacronutrients = (products: Product[]): Macronutrients => {
  let totalProteins = 0;
  let totalFats = 0;
  let totalCarbs = 0;
  let totalCalories = 0;

  for (const product of products) {
    const factor = (product.quantity || 0) / 100;
    totalProteins += product.proteins * factor;
    totalFats += product.fats * factor;
    totalCarbs += product.carbohydrates * factor;
    totalCalories += product.calories * factor;
  }

  return {
    calories: totalCalories,
    fats: totalFats,
    carbohydrates: totalCarbs,
    proteins: totalProteins,
  };
};
