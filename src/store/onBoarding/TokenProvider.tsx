import { FC, PropsWithChildren, useMemo, useReducer } from 'react';

import INIT_TOKEN_STATE from './initTokenState';
import { tokenReducer } from './tokenReducer';
import { TokenReducerType } from './tokenReducerType';
import { TokenContextType, TokenContext } from './TokenContext';

export const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tokenState, dispatchTokenState] = useReducer<TokenReducerType>(
    tokenReducer,
    INIT_TOKEN_STATE,
  );

  const contextValue = useMemo<TokenContextType>(() => {
    return { tokenState, dispatchTokenState };
  }, [tokenState, dispatchTokenState]);

  return <TokenContext.Provider value={contextValue}>{children}</TokenContext.Provider>;
};
