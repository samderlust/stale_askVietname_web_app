import { IFilter, IFilterContent } from './../types/placesTypes';
import { apiSearch } from './../../api/askVietnamese';
import {
  setFilterList,
  setPlacesInFilter,
  setSearchResult,
  setIsEmptyResult
} from './../actions';
import {
  IGetFilterList,
  IGetPlacesInFilter,
  ISetPlacesInFilter,
  ISetFilterList,
  ISearchLocation
} from './../types';
import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import apiCall, { fetchPlaces } from '../../api/askVietnamese';
import { PlacesActionType } from '../types/index';
import { AxiosResponse } from 'axios';

export function* fetchFilterList(action: IGetFilterList) {
  const res: AxiosResponse<IFilter[]> = yield call(fetchList, action.data);
  const list = res.data;

  if (action.data === 4) {
    const tetIndex = list.findIndex(e => e.travel_id === 'cl_tet_checkin');
    [list[0], list[tetIndex]] = [list[tetIndex], list[0]];
  }
  yield put<ISetFilterList>(setFilterList(list));
}

export function* fetchPlacesInFilter(action: IGetPlacesInFilter) {
  const res: AxiosResponse = yield call(fetchPlaces, action.data);
  yield put<ISetPlacesInFilter>(setPlacesInFilter(action.data, res.data));
}

function* fetchSearchLocation(action: ISearchLocation) {
  const res: AxiosResponse<IFilterContent[]> = yield call(
    apiSearch,
    action.data
  );
  const data = res.data;
  if (!data.length) yield put(setIsEmptyResult(true));
  yield put(setSearchResult(data));
}

export default function* watchGetFilterList() {
  yield takeEvery(PlacesActionType.GET_FILTER_LIST, fetchFilterList);
  yield takeLatest(PlacesActionType.GET_PLACES_IN_FILTER, fetchPlacesInFilter);
  yield takeEvery(PlacesActionType.SEARCH_LOCATIONS, fetchSearchLocation);
}

const fetchList = (travelmap_id: number) => {
  return apiCall.get('/map/get_filter/', {
    params: {
      travelmap_id
    }
  });
};
