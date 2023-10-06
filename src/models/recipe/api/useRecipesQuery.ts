import infiniteQueryBuilder from '../../../query/utils/infiniteQueryBuilder';
import { InfiniteRes } from '../../../query/interfaces/infiniteRes';
import { RecipeRes } from '../intrfaces/recipeRes';
import { Recipe } from '../intrfaces/recipe';
import { recipeResToRecipe } from '../utils/recipeResToRecipe';
import { ItemsBody } from '../../../query/interfaces/itemsBody';

export const useRecipesQuery = infiniteQueryBuilder<
  InfiniteRes<Recipe>,
  InfiniteRes<RecipeRes>,
  ItemsBody,
  ItemsBody
>({
  path: '/recipes',
  resTransformer: (source) => ({
    ...source,
    data: source.data.map(recipeResToRecipe),
  }),
  propsTransformer: (data, pageParams) => ({
    ...data,
    cursor: pageParams as string,
  }),
});
