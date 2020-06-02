import {
  ISetSearchResult,
  IFilter,
  ISetEmptyResult
} from './../types/placesTypes';
import {
  IGetFilterList,
  PlacesActionType,
  IGetPlacesInFilter,
  IFilterContent,
  ISetPlacesInFilter,
  ISetFilterList,
  ISetCurrentShowingPlace,
  ISearchLocation
} from './../types';

/**
 * get the filter list of a specific travel map
 * @param mapId map id
 */
export const getFilterList = (mapId: number): IGetFilterList => ({
  type: PlacesActionType.GET_FILTER_LIST,
  data: mapId
});

/**
 * send the filters list  to reducer
 * @param data filters list
 */
export const setFilterList = (data: IFilter[]): ISetFilterList => ({
  type: PlacesActionType.SET_FILTER_LIST,
  data
});

/**
 * get the places in the filter
 * @param filterName filter name
 */
export const getPlacesInFilter = (filterName: string): IGetPlacesInFilter => ({
  type: PlacesActionType.GET_PLACES_IN_FILTER,
  data: filterName
});

/**
 * set info of the current place to be displayed in Detail Modal in Mapscreen
 * @param data @see IFilterContent
 */
export const setCurrentShowingPlace = (
  data: IFilterContent
): ISetCurrentShowingPlace => ({
  type: PlacesActionType.SET_CURRENT_SHOWING_PLACE,
  data
});

/**
 * To set The places after selecting a filter into reducer
 * @param key
 * @param value
 */
export const setPlacesInFilter = (
  key: string,
  value: IFilterContent[]
): ISetPlacesInFilter => ({
  type: PlacesActionType.SET_PLACES_IN_FILTER,
  data: {
    key,
    value
  }
});

/**
 * When hit search button after input into the searchfield
 * this function will call Saga to perform request
 * @param travelmap_id
 * @param term
 */
export const searchLocation = (
  travelmap_id: number = 1,
  term: string
): ISearchLocation => ({
  type: PlacesActionType.SEARCH_LOCATIONS,
  data: { travelmap_id, term }
});

/**
 * after getting the results response from server.
 * set the result to reducer
 * @param data
 */
export const setSearchResult = (data: IFilterContent[]): ISetSearchResult => ({
  type: PlacesActionType.SET_SEARCH_RESULT,
  data
});

/**
 * set true if search return empty
 * @param data boolean
 */
export const setIsEmptyResult = (data: boolean): ISetEmptyResult => ({
  type: PlacesActionType.SET_EMPTY_RESULT,
  data
});
