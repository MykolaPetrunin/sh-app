import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import { CreateRecipeProps } from '../intrfaces/createRecipeProps';
import { Recipe } from '../intrfaces/recipe';
import { RecipeRes } from '../intrfaces/recipeRes';
import { recipeResToRecipe } from '../utils/recipeResToRecipe';

interface CreateRecipeBody {
  title: string;
  products: {
    product_id: string;
    quantity: number;
  }[];
}

export const useCreateRecipeMutation = mutationBuilder<
  CreateRecipeProps,
  Recipe,
  RecipeRes,
  CreateRecipeBody
>({
  path: '/recipes',
  method: MutationMethods.POST,
  resTransformer: recipeResToRecipe,
  propsTransformer: (source) => ({
    ...source,
    products: source.products.map((product) => ({ ...product, product_id: product.productId })),
  }),
});
