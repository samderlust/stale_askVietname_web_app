import {
  ICoord,
  ISetCheckInPlace,
  IsetDirectionError
} from './../types/mapsTypes';
import {
  mapsActions,
  ITraveMap,
  ISetTravelMaps,
  IGetTravelMaps,
  ISetCurrentMapId,
  ISetCurrentUserLocation
} from './../types/';
export const getTravelMaps = (): IGetTravelMaps => ({
  type: mapsActions.GET_MAP_LIST
});

/**
 * get the travel map list
 * @param data travel map list
 */
export const setTravelMaps = (data: ITraveMap[]): ISetTravelMaps => ({
  type: mapsActions.SET_MAP_LIST,
  data
});

/**
 * when user click on a specific travel map in the list
 * @param data current map data (id and coord to centralize the map)
 */
export const setCurrentMapId = (data: {
  id: number;
  coord: ICoord;
}): ISetCurrentMapId => ({
  type: mapsActions.SET_CURRENT_MAP_ID,
  data
});

/**
 * set the current Location of user,
 * @param data place
 */
export const setCurrentUserLocation = (
  data: ICoord
): ISetCurrentUserLocation => ({
  type: mapsActions.SET_CURRENT_USER_LOCATION,
  data
});

/**
 * The location that user wants to check in or get the direction on map
 * @param data place
 */
export const setCheckInPlace = (data: ICoord): ISetCheckInPlace => ({
  type: mapsActions.SET_CHECK_IN_PLACE,
  data
});

/**
 * set error message when geting direction on map fails
 * @param error error string
 */
export const setDirectionError = (error: string): IsetDirectionError => ({
  type: mapsActions.SET_DIRECTION_ERROR,
  data: error
});
