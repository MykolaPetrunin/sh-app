import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useOnlineManager } from './src/query/hooks/useOnlineManager';
import { useRefetchOnAppFocus } from './src/query/hooks/useRefetchOnAppFocus';
import { useUser } from './src/models/user/useUser';
import { PageLoader } from './src/components/atoms/pageLoader';
import { useEffect } from 'react';
import ApiService from './src/query/services/ApiService';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './src/navigation/AppStack';
import { AuthStack } from './src/navigation/AuthStack';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  useOnlineManager();
  useRefetchOnAppFocus();

  const { token: tokenProps, user } = useUser();

  useEffect(() => {
    if (!tokenProps.token) return;
    const axiosInstanceService = ApiService.getInstance();

    if (axiosInstanceService.isTokenSet) return;

    axiosInstanceService.setAuthToken(tokenProps.token);
  }, [tokenProps.token]);

  const isLoading = tokenProps.token === undefined || tokenProps.isLoading || user === undefined;

  console.log(queryClient, 'queryClient');

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          {isLoading && <PageLoader />}
          {!isLoading && (
            <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>
          )}
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
