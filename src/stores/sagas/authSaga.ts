import { sendAuthData, sendToken } from './../actions';
import { apiSignIn, apiSignUp } from './../../api/askVietnamese';
import {
  authActions,
  ISignInAction,
  ISignUpAction,
  IGetLocalToken
} from './../types/authTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

/**
 * send sign in request
 * get token and save to local storage
 * redirect to homepage
 * @param action ISignInAction
 */
function* sagaSignIn(action: ISignInAction) {
  try {
    const res = yield call(apiSignIn, action.data);
    const token = res.data.token;
    yield put(sendToken(token));
    yield localStorage.setItem('token', token);
    yield put(push('/'));
  } catch (error) {
    yield put(sendToken(''));
    console.error(error);
  }
}

/**
 * send sign up request
 * get token and save to local storage
 * redirect to homepage
 * @param action ISignUpAction
 */
function* sagaSignUp(action: ISignUpAction) {
  try {
    const res = yield call(apiSignUp, action.data);
    const token = res.data.token;
    yield put(
      sendAuthData({
        username: action.data.username,
        email: action.data.email
      })
    );
    yield put(sendToken(token));
    yield localStorage.setItem('token', token);
    yield put(push('/'));
  } catch (error) {
    yield put(sendToken(''));
    console.error(error);
  }
}

/**
 * get the token from local storage
 * @param action IGetLocalToken
 */
function* sagaGetLocalToken(action: IGetLocalToken) {
  try {
    const token = yield localStorage.getItem('token');
    yield sendToken(token);
  } catch (error) {
    yield put(sendToken(''));
    console.error(error);
  }
}

export function* watchAuthSaga() {
  yield takeLatest(authActions.SIGN_IN, sagaSignIn);
  yield takeLatest(authActions.SIGN_UP, sagaSignUp);
  yield takeLatest(authActions.GET_LOCAL_TOKEN, sagaGetLocalToken);
}
