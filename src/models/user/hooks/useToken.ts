import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface UseTokenRes {
  token?: string | null;
  isLoading: boolean;
}

export const useToken = (): UseTokenRes => {
  const [userToken, setUserToken] = useState<string | null | undefined>();

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

  return {
    token: userToken,
    isLoading: false,
  };
};
