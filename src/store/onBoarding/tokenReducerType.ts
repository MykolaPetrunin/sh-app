import { Reducer } from 'react';

import { TokenActions } from './tokenActions';
import { TokenState } from './tokenState';

export type TokenReducerType = Reducer<TokenState, TokenActions>;
