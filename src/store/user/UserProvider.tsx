import { FC, PropsWithChildren, useMemo, useReducer } from 'react';

import { noop } from 'lodash';
import { createContext } from 'react';

import { UserState } from './interfaces/userState';
import { UserActions } from './userActions';
import { UserReducerType } from './interfaces/userReducerType';
import { userReducer } from './userReducer';
import { INIT_USER_STATE } from './initUserState';

export interface UserContextType {
  userState: UserState;
  dispatchUserState: (action: UserActions) => void;
}

export const UserContext = createContext<UserContextType>({
  dispatchUserState: noop,
  userState: INIT_USER_STATE,
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userState, dispatchUserState] = useReducer<UserReducerType>(userReducer, INIT_USER_STATE);

  const contextValue = useMemo<UserContextType>(() => {
    return { userState, dispatchUserState };
  }, [userState, dispatchUserState]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
