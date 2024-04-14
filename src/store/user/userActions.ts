import actionFn from '../utils/actionFn';
import { User } from './interfaces/user';

export enum UserActionsTypes {
  Login = 'Login',
  LogOut = 'LogOut',
  SetUser = 'SetUser',
  SetLoading = 'SetLoading',
}

export interface SetUserAction {
  type: UserActionsTypes.SetUser;
  payload?: User;
}

export const setUser = actionFn<SetUserAction>(UserActionsTypes.SetUser);

export interface SetLoadingAction {
  type: UserActionsTypes.SetLoading;
  payload: boolean;
}

export const setUserLoading = actionFn<SetLoadingAction>(UserActionsTypes.SetLoading);

export type UserActions = SetUserAction | SetLoadingAction;
