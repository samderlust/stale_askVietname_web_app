import {
  IToggleThemeAction,
  settingActions,
  ISetShowPlacesDrawer,
  ISetInnerSize
} from './../types';

/**
 *toggle the theme
 */
export const toggleTheme = (): IToggleThemeAction => ({
  type: settingActions.TOGGLE_THEME
});

/**
 * set to show or hide the place drawer
 * @param data boolean
 */
export const setShowPlacesDrawer = (data: boolean): ISetShowPlacesDrawer => ({
  type: settingActions.TOGGLE_PLACES_DRAWER,
  data
});

/**
 * change with and height of the app according to browser size change
 * @param data innerHeigh and innerWidth
 */
export const setInnerSize = (data: {
  mainHeight: number;
  mainWidth: number;
}): ISetInnerSize => ({
  type: settingActions.CHANGE_INNER_SIZE,
  data
});
