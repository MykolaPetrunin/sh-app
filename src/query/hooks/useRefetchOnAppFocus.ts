import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { focusManager } from '@tanstack/react-query';

export const useRefetchOnAppFocus = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    });

    return () => subscription.remove();
  }, []);
};
