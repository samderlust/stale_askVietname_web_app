import { ISetShowRequiredLogInModal } from './../types/authTypes';
import {
  ISignInAction,
  authActions,
  ISignUpData,
  ISignUpAction,
  ISendTokenAction,
  ISendingAuthDataAction,
  IGetLocalToken
} from './../types/';
export const signIn = (data: {
  email: string;
  password: string;
}): ISignInAction => ({
  type: authActions.SIGN_IN,
  data
});

/**
 * action of sign up
 * @param data sign Up data
 */
export const signUp = (data: ISignUpData): ISignUpAction => ({
  type: authActions.SIGN_UP,
  data
});

/**
 * send token to reducer
 * @param data token
 */
export const sendToken = (data: string): ISendTokenAction => ({
  type: authActions.SEND_TOKEN,
  data
});

/**
 * action to get token from local storage
 */
export const getLocalToken = (): IGetLocalToken => ({
  type: authActions.GET_LOCAL_TOKEN
});

/**
 * action to sign in the app
 * @param data sign up data
 */
export const sendAuthData = (data: {
  email: string;
  username: string;
}): ISendingAuthDataAction => ({
  type: authActions.SENDING_AUTH_DATA,
  data
});

/**
 * show modal that indicate user to log in to use a feature
 * @param data boolean
 */
export const setShowRequiredLoginModal = (
  data: boolean
): ISetShowRequiredLogInModal => ({
  type: authActions.SET_SHOW_REQUIRED_LOG_IN_MODAL,
  data
});
