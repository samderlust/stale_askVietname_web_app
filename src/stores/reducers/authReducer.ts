import { IAuthReducer, IAuthAction, authActions } from './../types/authTypes';
const INIT_STATE: IAuthReducer = {
  username: '',
  email: '',
  token: '',
  isSignedIn: false,
  requiredLogInModal: false
};

export const authReducer = (
  state = INIT_STATE,
  action: IAuthAction
): IAuthReducer => {
  switch (action.type) {
    case authActions.SENDING_AUTH_DATA:
      return {
        ...state,
        username: action.data.username,
        email: action.data.email
      };
    case authActions.SEND_TOKEN:
      return { ...state, token: action.data, isSignedIn: true };
    case authActions.SIGN_OUT:
      return { ...state, isSignedIn: false };
    case authActions.SET_SHOW_REQUIRED_LOG_IN_MODAL:
      return { ...state, requiredLogInModal: action.data };
    default:
      return state;
  }
};
