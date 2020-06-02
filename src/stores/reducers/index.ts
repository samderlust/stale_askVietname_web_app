import { IAuthReducer } from './../types/authTypes';
import { authReducer } from './authReducer';
import { ISettingReducer } from './../types/settingTypes';
import { IMapsReducer } from './../types/mapsTypes';
import { IPlacesReducer } from './../types/placesTypes';
import { combineReducers } from 'redux';
import placesReducer from './placesReducers';
import mapsReducer from './mapsReducer';
import settingReducer from './settingReducer';
import { connectRouter, RouterState } from 'connected-react-router';

export interface StoreState {
  placesReducer: IPlacesReducer;
  mapsReducer: IMapsReducer;
  settingReducer: ISettingReducer;
  authReducer: IAuthReducer;
  router: RouterState;
}
const rootReducer = (history: any) =>
  combineReducers<StoreState>({
    placesReducer,
    mapsReducer,
    settingReducer,
    authReducer,
    router: connectRouter(history)
  });

export default rootReducer;
