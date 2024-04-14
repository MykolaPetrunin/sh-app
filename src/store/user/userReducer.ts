import { UserActionsTypes } from './userActions';
import { UserReducerType } from './interfaces/userReducerType';

export const userReducer: UserReducerType = (state, action) => {
  const actionTypes = UserActionsTypes;

  switch (action.type) {
    case actionTypes.SetUser:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SetLoading:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.LogOut:
      return {
        ...state,
        user: undefined,
        loading: false,
      };
    default:
      return state;
  }
};
