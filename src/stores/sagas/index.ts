import { all, fork } from 'redux-saga/effects';

import placesSaga from './placesSaga';
import { watchMapsRootSaga } from './mapsSaga';
import { watchAuthSaga } from './authSaga';

export default function* rootSaga() {
  yield all([watchMapsRootSaga(), placesSaga(), watchAuthSaga()]);
}
