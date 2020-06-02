import { Action } from 'redux';

export enum PlacesActionType {
  GET_FILTER_LIST = 'GET_FILTER_LIST',
  SET_FILTER_LIST = 'SET_FILTER_LIST',
  GET_PLACES_IN_FILTER = 'GET_PLACES_IN_FILTER',
  SET_PLACES_IN_FILTER = 'SET_PLACES_IN_FILTER',
  SET_MAP_COLOR = 'SET_MAP_COLOR',
  SET_CURRENT_SHOWING_PLACE = 'SET_CURRENT_SHOWING_PLACE',
  SEARCH_LOCATIONS = 'SEARCH_LOCATIONS',
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  SET_EMPTY_RESULT = 'SET_EMPTY_RESULT'
}

export interface IPlacesReducer {
  filterList: IFilter[];
  placesInFilter: {
    [key: string]: IFilterContent[];
  };
  currentFilter: string;
  currentShowingPlace: IFilterContent;
  searchResult: IFilterContent[];
  isEmptyResult: boolean;
}

// export interface IPlacesAction extends Action {
//   type: PlacesActionType;
//   data?: any;
// }
export type IPlacesAction =
  | IGetFilterList
  | ISetFilterList
  | IGetPlacesInFilter
  | ISetCurrentShowingPlace
  | ISetSearchResult
  | ISearchLocation
  | ISetEmptyResult
  | ISetPlacesInFilter;

export interface IGetFilterList extends Action {
  type: PlacesActionType.GET_FILTER_LIST;
  data: number;
}
export interface ISetFilterList extends Action {
  type: PlacesActionType.SET_FILTER_LIST;
  data: IFilter[];
}

export interface IGetPlacesInFilter extends Action {
  type: PlacesActionType.GET_PLACES_IN_FILTER;
  data: string;
}

export interface ISetPlacesInFilter extends Action {
  type: PlacesActionType.SET_PLACES_IN_FILTER;
  data: {
    key: string;
    value: IFilterContent[];
  };
}

export interface ISetCurrentShowingPlace extends Action {
  type: PlacesActionType.SET_CURRENT_SHOWING_PLACE;
  data: IFilterContent;
}

export interface ISearchLocation extends Action {
  type: PlacesActionType.SEARCH_LOCATIONS;
  data: {
    travelmap_id: number;
    term: string;
  };
}

export interface ISetEmptyResult extends Action {
  type: PlacesActionType.SET_EMPTY_RESULT;
  data: boolean;
}

export interface ISetSearchResult extends Action {
  type: PlacesActionType.SET_SEARCH_RESULT;
  data: IFilterContent[];
}

export interface IFilter {
  id: number;
  map_id: number;
  name: string;
  icon: string;
  pin: string;
  travel_id: string;
}
export interface IFilterContent {
  id: string;
  location_name: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: [];
  filter_images?: IFilter;
}

export interface IImagesInPlace {
  id: number;
  location_id: number;
  url: string;
}
