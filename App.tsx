import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useOnlineManager } from './src/query/hooks/useOnlineManager';
import { useRefetchOnAppFocus } from './src/query/hooks/useRefetchOnAppFocus';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppMain from './src/AppMain';
import { TokenProvider } from './src/store/onBoarding/TokenProvider';

const queryClient = new QueryClient();

export default function App() {
  useOnlineManager();
  useRefetchOnAppFocus();

  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <PaperProvider
          theme={{
            version: 3,
          }}
        >
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <AppMain />
          </SafeAreaProvider>
        </PaperProvider>
      </TokenProvider>
    </QueryClientProvider>
  );
}
