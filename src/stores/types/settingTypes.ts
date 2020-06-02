import { Action } from 'redux';
export enum settingActions {
  TOGGLE_THEME = 'TOGGLE_THEME',
  TOGGLE_PLACES_DRAWER = 'TOGGLE_PLACES_DRAWER',
  CHANGE_INNER_SIZE = 'CHANGE_INNER_SIZE'
}

export enum themeType {
  light,
  dark
}

export interface ISettingReducer {
  theme: themeType;
  showPlacesDrawer: boolean;
  mainHeight: number;
  mainWidth: number;
}

export interface IToggleThemeAction extends Action {
  type: settingActions.TOGGLE_THEME;
}

export interface ISetShowPlacesDrawer extends Action {
  type: settingActions.TOGGLE_PLACES_DRAWER;
  data: boolean;
}

export interface ISetInnerSize extends Action {
  type: settingActions.CHANGE_INNER_SIZE;
  data: { mainHeight: number; mainWidth: number };
}

export type ISettingAction =
  | IToggleThemeAction
  | ISetInnerSize
  | ISetShowPlacesDrawer;
