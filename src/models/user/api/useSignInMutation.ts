import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import { UserSignInData } from '../interfaces/userSignInData';

interface UseSignInRes {
  token: string;
}

export const useSignInMutation = mutationBuilder<
  UserSignInData,
  UseSignInRes,
  UseSignInRes,
  UserSignInData
>({
  path: '/users/login',
  method: MutationMethods.POST,
  resTransformer: (data) => data,
  propsTransformer: (data) => data,
});
