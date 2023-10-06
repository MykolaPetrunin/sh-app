import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import { Recipe } from '../intrfaces/recipe';
import { recipeResToRecipe } from '../utils/recipeResToRecipe';
import { RecipeRes } from '../intrfaces/recipeRes';
import { UpdateRecipeProps } from '../intrfaces/updateRecipeProps';

type Body = Omit<UpdateRecipeProps, 'id'>;

export const useUpdateRecipeMutation = mutationBuilder<UpdateRecipeProps, Recipe, RecipeRes, Body>({
  path: (source) => `/recipes/${source.id}`,
  method: MutationMethods.PATCH,
  resTransformer: recipeResToRecipe,
  propsTransformer: (source) => ({
    ...(source.title ? { title: source.title } : {}),
    ...(source.products ? { proteins: source.products } : {}),
  }),
});
