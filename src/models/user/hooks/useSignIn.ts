export interface UseSignInRes {
  isLoading: boolean;
}
export const useSignIn = (): UseSignInRes => {
  return {
    isLoading: false,
  };
};
