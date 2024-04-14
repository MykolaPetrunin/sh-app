import actionFn from '../utils/actionFn';
import { User } from './interfaces/user';

export enum UserActionsTypes {
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

export interface LogOutAction {
  type: UserActionsTypes.LogOut;
}

export const logout = (): LogOutAction => ({
  type: UserActionsTypes.LogOut,
});

export type UserActions = SetUserAction | SetLoadingAction | LogOutAction;
