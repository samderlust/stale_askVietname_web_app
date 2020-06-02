import { Action } from 'redux';
export enum mapsActions {
  GET_MAP_LIST = 'GET_MAP_LIST',
  SET_MAP_LIST = 'SET_MAP_LIST',
  SET_CURRENT_MAP_ID = 'SET_CURRENT_MAP_ID',
  SET_CURRENT_USER_LOCATION = 'SET_CURRENT_USER_LOCATION',
  SET_CHECK_IN_PLACE = 'SET_CHECK_IN_PLACE',
  SET_DIRECTION_ERROR = 'SET_DIRECTION_ERROR'
}

export interface IMapsReducer {
  allMaps: ITraveMap[];
  currentMapId: number;
  currentCenterPoint: ICoord;
  checkInPlace: ICoord;
  userLocation: ICoord;
  directionError: string;
}
export interface IGetTravelMaps extends Action {
  type: mapsActions.GET_MAP_LIST;
}

export interface ISetTravelMaps extends Action {
  type: mapsActions.SET_MAP_LIST;
  data: ITraveMap[];
}

export interface ISetCurrentMapId extends Action {
  type: mapsActions.SET_CURRENT_MAP_ID;
  data: {
    id: number;
    coord: ICoord;
  };
}

export interface ISetCurrentUserLocation extends Action {
  type: mapsActions.SET_CURRENT_USER_LOCATION;
  data: ICoord;
}

export interface ISetCheckInPlace extends Action {
  type: mapsActions.SET_CHECK_IN_PLACE;
  data: ICoord;
}

export interface IsetDirectionError extends Action {
  type: mapsActions.SET_DIRECTION_ERROR;
  data: string;
}

export type IMapsActions =
  | IGetTravelMaps
  | ISetTravelMaps
  | ISetCurrentUserLocation
  | ISetCheckInPlace
  | IsetDirectionError
  | ISetCurrentMapId;
export interface ITraveMap {
  id: number;
  name: string;
  icon: string;
  pin: string;
  created_at?: string;
  updated_at?: string;
  latitude: string;
  longitude: string;
}

export interface ICoord {
  lat: number;
  lng: number;
}
