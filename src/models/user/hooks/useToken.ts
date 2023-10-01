import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSignInMutation } from '../api/useSignInMutation';
import { UserSignInData } from '../interfaces/userSignInData';

export interface UseTokenRes {
  token?: string | null;
  isLoading: boolean;
  login: (data: UserSignInData) => Promise<string>;
}

export const useToken = (): UseTokenRes => {
  const [userToken, setUserToken] = useState<string | null | undefined>();

  const { isLoading, mutateAsync } = useSignInMutation(['SignInMutation']);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        setUserToken(await AsyncStorage.getItem('userToken'));
      } catch (e) {
        console.error(e);
      }
    };

    bootstrapAsync().then();
  }, []);

  const login = async (data: UserSignInData): Promise<string> => {
    const { token } = await mutateAsync(data);
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);

    return token;
  };

  return {
    token: userToken,
    isLoading: isLoading,
    login,
  };
};
