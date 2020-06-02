import {
  ISettingReducer,
  themeType,
  ISettingAction,
  settingActions
} from './../types';
const INIT_STATE: ISettingReducer = {
  theme: themeType.light,
  showPlacesDrawer: false,
  mainHeight: window.innerHeight,
  mainWidth: window.innerWidth
};

export default (
  state = INIT_STATE,
  action: ISettingAction
): ISettingReducer => {
  switch (action.type) {
    case settingActions.TOGGLE_THEME:
      return {
        ...state,
        theme:
          state.theme === themeType.light ? themeType.dark : themeType.light
      };
    case settingActions.TOGGLE_PLACES_DRAWER:
      return { ...state, showPlacesDrawer: action.data };
    case settingActions.CHANGE_INNER_SIZE:
      return {
        ...state,
        mainHeight: action.data.mainHeight,
        mainWidth: action.data.mainWidth
      };
    default:
      return state;
  }
};
