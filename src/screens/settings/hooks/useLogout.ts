import { useCurrentUser } from '../../../models/user/hooks/useCurrentUser';
import { useUser } from '../../../models/user/useUser';
import { useContext } from 'react';
import { TokenContext } from '../../../store/onBoarding/TokenContext';
import { setToken } from '../../../store/onBoarding/tokenActions';

interface UseLogout {
  logOut: () => Promise<void>;
}

export const useLogout = (): UseLogout => {
  const { dispatchTokenState } = useContext(TokenContext);

  const { token, currentUser } = useUser({
    isUserEnabled: true,
  });
  const logOut = async () => {
    await token.logout();

    dispatchTokenState(setToken(null));

    if (!currentUser.currentUser) return;

    await currentUser.logOut();
  };

  return {
    logOut,
  };
};
