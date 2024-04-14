import { Reducer } from 'react';

import { UserActions } from '../userActions';
import { UserState } from './userState';

export type UserReducerType = Reducer<UserState, UserActions>;
