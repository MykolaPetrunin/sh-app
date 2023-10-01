import actionFn from '../utils/actionFn';

export enum TokenActionsTypes {
  SetToken = 'SetToken',
}

export interface SetTokenAction {
  type: TokenActionsTypes.SetToken;
  payload?: string | null;
}

export const setToken = actionFn<SetTokenAction>(TokenActionsTypes.SetToken);

export type TokenActions = SetTokenAction;
