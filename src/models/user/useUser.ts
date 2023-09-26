import { useToken, UseTokenRes } from './hooks/useToken';

interface UserModel {
  token: UseTokenRes;
  user?: string | null;
}

export const useUser = (): UserModel => {
  const token = useToken();

  return {
    token,
    user: null,
  };
};
