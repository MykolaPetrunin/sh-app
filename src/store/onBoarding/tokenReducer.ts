import { TokenReducerType } from './tokenReducerType';
import { TokenActionsTypes } from './tokenActions';

export const tokenReducer: TokenReducerType = (state, action) => {
  const actionTypes = TokenActionsTypes;

  switch (action.type) {
    case actionTypes.SetToken:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
