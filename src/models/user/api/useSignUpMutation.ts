import { mutationBuilder, MutationMethods } from '../../../query/utils/mutationBuilder';
import NewUserData from '../interfaces/newUserData';

interface UseSignUpRes {
  message: string;
}

interface Body {
  username: string;
  password: string;
  email: string;
}

export const useSignUpMutation = mutationBuilder<NewUserData, UseSignUpRes, UseSignUpRes, Body>({
  path: '/users/signup',
  method: MutationMethods.POST,
  resTransformer: (data) => data,
  propsTransformer: (data) => ({
    email: data.email,
    username: data.userName,
    password: data.password,
  }),
});
