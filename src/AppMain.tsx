import { useOnlineManager } from './query/hooks/useOnlineManager';
import { useRefetchOnAppFocus } from './query/hooks/useRefetchOnAppFocus';
import { useContext } from 'react';
import { UserContext } from './store/user/UserProvider';
import { PageLoader } from './components/atoms/pageLoader/PageLoader';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './navigation/AppStack';
import { AuthStack } from './navigation/AuthStack';
// import { useUser } from './models/user/useUser';
// import { useContext, useEffect, useState } from 'react';
// import ApiService from './query/services/ApiService';
// import { NavigationContainer } from '@react-navigation/native';
// import { AppStack } from './navigation/AppStack';
// import { AuthStack } from './navigation/AuthStack';
// import { TokenContext } from './store/onBoarding/TokenContext';
// import { setToken } from './store/onBoarding/tokenActions';
// import { PageLoader } from './components/atoms/pageLoader/PageLoader';

export default function AppMain() {
  // const [isCurrentUserEnabled, setIsCurrentUserEnabled] = useState<boolean>(false);
  const { userState } = useContext(UserContext);

  useOnlineManager();
  useRefetchOnAppFocus();

  // const { tokenState, dispatchTokenState } = useContext(TokenContext);
  //
  // const { token: tokenProps, currentUser: currentUserProps } = useUser({
  //   isUserEnabled: isCurrentUserEnabled,
  // });
  //
  // console.log(currentUserProps, 'currentUserProps');
  //
  // useEffect(() => {
  //   if (!tokenState.token) return;
  //   const axiosInstanceService = ApiService.getInstance();
  //
  //   if (axiosInstanceService.isTokenSet) return;
  //
  //   axiosInstanceService.setAuthToken(tokenState.token);
  //   setIsCurrentUserEnabled(true);
  // }, [tokenState.token]);
  //
  // useEffect(() => {
  //   if (tokenProps.token === undefined) return;
  //
  //   dispatchTokenState(setToken(tokenProps.token));
  // }, [tokenProps.token]);
  //

  return (
    <>
      {userState.loading && <PageLoader />}
      {!userState.loading && (
        <NavigationContainer>{userState.user ? <AppStack /> : <AuthStack />}</NavigationContainer>
      )}
    </>
  );
}
