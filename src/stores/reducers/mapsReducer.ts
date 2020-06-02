import {
  IMapsReducer,
  IMapsActions,
  mapsActions,
  ICoord
} from './../types/mapsTypes';
const INIT_STATE: IMapsReducer = {
  allMaps: [],
  currentMapId: 0,
  currentCenterPoint: { lat: 10.771344, lng: 106.693126 },
  checkInPlace: {} as ICoord,
  userLocation: {} as ICoord,
  directionError: ''
};

export default (state = INIT_STATE, action: IMapsActions): IMapsReducer => {
  switch (action.type) {
    case mapsActions.SET_MAP_LIST:
      return { ...state, allMaps: action.data };
    case mapsActions.SET_CURRENT_MAP_ID:
      return {
        ...state,
        currentMapId: action.data.id,
        currentCenterPoint: action.data.coord
      };
    case mapsActions.SET_CURRENT_USER_LOCATION:
      return {
        ...state,
        currentCenterPoint: action.data,
        userLocation: action.data
      };
    case mapsActions.SET_CHECK_IN_PLACE:
      return { ...state, checkInPlace: action.data };
    case mapsActions.SET_DIRECTION_ERROR:
      return { ...state, directionError: action.data };
    default:
      return state;
  }
};
