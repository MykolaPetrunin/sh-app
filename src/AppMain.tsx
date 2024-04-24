import { useOnlineManager } from './query/hooks/useOnlineManager';
import { useRefetchOnAppFocus } from './query/hooks/useRefetchOnAppFocus';
import { useContext } from 'react';
import { UserContext } from './store/user/UserProvider';
import { PageLoader } from './components/atoms/pageLoader/PageLoader';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './navigation/AppStack';
import { AuthStack } from './navigation/AuthStack';

export default function AppMain() {
  const { userState } = useContext(UserContext);

  useOnlineManager();
  useRefetchOnAppFocus();

  return (
    <>
      {userState.loading && <PageLoader />}
      {!userState.loading && (
        <NavigationContainer>{userState.user ? <AppStack /> : <AuthStack />}</NavigationContainer>
      )}
    </>
  );
}
