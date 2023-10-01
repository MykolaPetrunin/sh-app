import { useCurrentUserQuery } from '../api/useCurrentUserQuery';
import { CurrentUser } from '../interfaces/currentUser';

export interface UseCurrentUserRes {
  isLoading: boolean;
  currentUser?: CurrentUser;
}

interface UseCurrentUserProps {
  isEnabled?: boolean;
}

export const useCurrentUser = ({ isEnabled }: UseCurrentUserProps): UseCurrentUserRes => {
  const { isInitialLoading, data } = useCurrentUserQuery({
    keys: ['CurrentUserQuery'],
    isEnabled: !!isEnabled,
  });

  return {
    currentUser: data,
    isLoading: isInitialLoading,
  };
};
