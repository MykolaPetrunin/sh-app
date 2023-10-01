import { useToken, UseTokenRes } from './hooks/useToken';
import { useSignUp, UseSignUpRes } from './hooks/useSignUp';
import { useSignIn, UseSignInRes } from './hooks/useSignIn';
import { useCurrentUser, UseCurrentUserRes } from './hooks/useCurrentUser';

interface UserModel {
  token: UseTokenRes;
  currentUser: UseCurrentUserRes;
  signUp: UseSignUpRes;
  signIn: UseSignInRes;
}

interface UseUserProps {
  isUserEnabled?: boolean;
}

export const useUser = ({ isUserEnabled }: UseUserProps): UserModel => {
  const token = useToken();
  const signUp = useSignUp();
  const signIn = useSignIn();
  const currentUser = useCurrentUser({ isEnabled: isUserEnabled });

  return {
    token,
    currentUser,
    signUp,
    signIn,
  };
};
