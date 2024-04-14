import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppMain from './src/AppMain';
import { TokenProvider } from './src/store/onBoarding/TokenProvider';
import { UserProvider } from './src/store/user/UserProvider';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
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
      </UserProvider>
    </QueryClientProvider>
  );
}
