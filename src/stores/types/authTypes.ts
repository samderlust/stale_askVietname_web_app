import { Action } from 'redux';

export enum authActions {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
  SENDING_AUTH_DATA = 'SENDING_AUTH_DATA',
  SEND_TOKEN = 'SEND_TOKEN',
  GET_LOCAL_TOKEN = 'GET_LOCAL_TOKEN',
  SET_SHOW_REQUIRED_LOG_IN_MODAL = 'SET_SHOW_REQUIRED_LOG_IN_MODAL'
}

export interface IAuthReducer {
  username: string;
  email: string;
  token: string;
  isSignedIn: boolean;
  requiredLogInModal: boolean;
}

export interface ISignInAction extends Action {
  type: authActions.SIGN_IN;
  data: {
    email: string;
    password: string;
  };
}
export interface ISendingAuthDataAction extends Action {
  type: authActions.SENDING_AUTH_DATA;
  data: { username: string; email: string };
}

export interface ISendTokenAction extends Action {
  type: authActions.SEND_TOKEN;
  data: string;
}
export interface ISignUpAction extends Action {
  type: authActions.SIGN_UP;
  data: ISignUpData;
}

export interface IGetLocalToken extends Action {
  type: authActions.GET_LOCAL_TOKEN;
}

export interface ISignUpData extends Action {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface ISignOutAction extends Action {
  type: authActions.SIGN_OUT;
}

export interface ISetShowRequiredLogInModal extends Action {
  type: authActions.SET_SHOW_REQUIRED_LOG_IN_MODAL;
  data: boolean;
}

export type IAuthAction =
  | ISignInAction
  | ISendingAuthDataAction
  | ISignUpAction
  | IGetLocalToken
  | ISignOutAction
  | ISetShowRequiredLogInModal
  | ISendTokenAction;
