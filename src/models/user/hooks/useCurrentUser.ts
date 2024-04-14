import { useCurrentUserQuery } from '../api/useCurrentUserQuery';
import { CurrentUser } from '../interfaces/currentUser';
import { useEffect, useMemo, useState } from 'react';

export interface UseCurrentUserRes {
  isLoading: boolean;
  currentUser?: CurrentUser;
  isError: boolean;
}

interface UseCurrentUserProps {
  isEnabled?: boolean;
}

export const useCurrentUser = ({ isEnabled }: UseCurrentUserProps): UseCurrentUserRes => {
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const keys = useMemo(() => ['CurrentUserQuery'], []);
  const { isInitialLoading, data, isError, refetch } = useCurrentUserQuery({
    keys,
    isEnabled: !!isEnabled,
  });

  console.log(isFirstLoad, 'isFirstLoad');
  console.log(isEnabled, 'isEnabled');
  useEffect(() => {
    if (!!data || !isEnabled || isFirstLoad) return;
    console.log(777);
    refetch().then();
  }, [isEnabled, data, isFirstLoad]);

  useEffect(() => {
    if (isError || data) setIsFirstLoad(false);
  }, [isError, data]);

  console.log(data, 'data');
  return {
    currentUser: data,
    isLoading: isInitialLoading,
    isError,
  };
};
