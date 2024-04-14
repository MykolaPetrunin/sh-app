import { useUser } from '../../../models/user/useUser';
import { useContext } from 'react';
import { UserContext } from '../../../store/user/UserProvider';
import { logout } from '../../../store/user/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseLogout {
  logOut: () => Promise<void>;
}

export const useLogout = (): UseLogout => {
  const { dispatchUserState } = useContext(UserContext);

  const logOut = async () => {
    await AsyncStorage.removeItem('userToken');

    dispatchUserState(logout());
  };

  return {
    logOut,
  };
};
