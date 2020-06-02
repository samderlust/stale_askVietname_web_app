import {
  PlacesActionType,
  IPlacesAction,
  IFilterContent
} from './../types/placesTypes';
import { IPlacesReducer } from '../types/index';

const INIT_STATE: IPlacesReducer = {
  filterList: [],
  placesInFilter: {},
  currentFilter: '',
  currentShowingPlace: {} as IFilterContent,
  searchResult: [],
  isEmptyResult: false
};

export default (
  state: IPlacesReducer = INIT_STATE,
  action: IPlacesAction
): IPlacesReducer => {
  switch (action.type) {
    case PlacesActionType.SET_FILTER_LIST:
      return { ...state, filterList: action.data };
    case PlacesActionType.SET_PLACES_IN_FILTER:
      return {
        ...state,
        placesInFilter: { [action.data.key]: action.data.value },
        currentFilter: action.data.key
      };
    case PlacesActionType.SET_CURRENT_SHOWING_PLACE:
      return { ...state, currentShowingPlace: action.data };
    case PlacesActionType.SET_SEARCH_RESULT:
      return { ...state, searchResult: action.data };
    case PlacesActionType.SET_EMPTY_RESULT:
      return { ...state, isEmptyResult: action.data };
    default:
      return state;
  }
};
