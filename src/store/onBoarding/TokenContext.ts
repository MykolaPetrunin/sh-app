import { noop } from 'lodash';
import { createContext } from 'react';

import { TokenActions } from './tokenActions';
import INIT_TOKEN_STATE from './initTokenState';
import { TokenState } from './tokenState';

export interface TokenContextType {
  tokenState: TokenState;
  dispatchTokenState: (action: TokenActions) => void;
}

export const TokenContext = createContext<TokenContextType>({
  dispatchTokenState: noop,
  tokenState: INIT_TOKEN_STATE,
});
