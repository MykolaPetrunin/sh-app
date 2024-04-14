import { useSignUpMutation } from '../api/useSignUpMutation';
import { NewUserData } from '../interfaces/newUserData';

export interface UseSignUpRes {
  isLoading: boolean;
  signUp: (data: NewUserData) => Promise<void>;
}
export const useSignUp = (): UseSignUpRes => {
  const { isLoading, mutateAsync } = useSignUpMutation(['SignUpMutation']);

  const signUp = async (data: NewUserData): Promise<void> => {
    await mutateAsync(data);
  };

  return {
    signUp,
    isLoading,
  };
};
