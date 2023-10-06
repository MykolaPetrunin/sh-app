import { queryBuilder } from '../../../query/utils/queryBuilder';
import { Recipe } from '../intrfaces/recipe';
import { RecipeRes } from '../intrfaces/recipeRes';
import { recipeResToRecipe } from '../utils/recipeResToRecipe';

interface UseRecipeQueryProps {
  id: string;
}

export const useRecipeQuery = queryBuilder<Recipe, RecipeRes, UseRecipeQueryProps>({
  path: (data) => `/recipes/${data?.id}`,
  resTransformer: recipeResToRecipe,
});
