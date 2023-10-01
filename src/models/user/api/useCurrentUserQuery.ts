import { queryBuilder } from '../../../query/utils/queryBuilder';
import { CurrentUser } from '../interfaces/currentUser';
import { CurrentUserRes } from '../interfaces/currentUserRes';
import { currentUserResToCurrentUser } from '../utils/currentUserResToCurrentUser';

export const useCurrentUserQuery = queryBuilder<CurrentUser, CurrentUserRes>({
  path: '/users/current-user',
  resTransformer: currentUserResToCurrentUser,
});
