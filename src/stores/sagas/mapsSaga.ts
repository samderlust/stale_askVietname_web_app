import {
  ITraveMap,
  ISetTravelMaps,
  mapsActions,
  IGetTravelMaps
} from './../types/mapsTypes';
import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import apiCall, { fetchTravelMaps } from '../../api/askVietnamese';
import { AxiosResponse } from 'axios';
import { setTravelMaps } from '../actions';

/**
 * get the travel maps
 * @param action IGetTravelMaps
 */
function* sagaGetTravelMaps(action: IGetTravelMaps) {
  const res: AxiosResponse = yield call(fetchTravelMaps);
  console.log(res.data);
  yield put<ISetTravelMaps>(setTravelMaps(res.data));
}

export function* watchMapsRootSaga() {
  yield takeEvery(mapsActions.GET_MAP_LIST, sagaGetTravelMaps);
}
