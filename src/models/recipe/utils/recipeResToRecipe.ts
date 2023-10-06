import { RecipeRes } from '../intrfaces/recipeRes';
import { Recipe } from '../intrfaces/recipe';

export const recipeResToRecipe = ({
  description,
  user_id,
  products,
  ...rest
}: RecipeRes): Recipe => ({
  ...rest,
  userId: user_id,
  ...(description ? { description } : {}),
  ...(products
    ? {
        products: products.map((product) => ({
          title: product.title,
          quantity: product.product_info.quantity,
          fats: product.fats,
          calories: product.fats * 9 + product.proteins * 4 + product.carbohydrates * 4,
          proteins: product.proteins,
          carbohydrates: product.carbohydrates,
          id: product.id,
        })),
      }
    : {}),
});
