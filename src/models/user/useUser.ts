import { useToken, UseTokenRes } from './hooks/useToken';
import { useSignUp, UseSignUpRes } from './hooks/useSignUp';

interface UserModel {
  token: UseTokenRes;
  user?: string | null;
  signUp: UseSignUpRes;
}

export const useUser = (): UserModel => {
  const token = useToken();
  const signUp = useSignUp();

  return {
    token,
    user: null,
    signUp,
  };
};
