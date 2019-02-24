import { Color, Kimariji } from '@src/types';
import * as types from './types';
import * as constants from './constants';

const colors: Color[] = ['blue', 'pink', 'yellow', 'green', 'orange'];
const kimarijis: Kimariji[] = [1, 2, 3, 4, 5, 6];

export const initialState: types.State = {
  karutasFilter: {
    open: false,
    colors: colors.map(color => ({ color, checked: true })),
    kimarijis: kimarijis.map(kimariji => ({ kimariji, checked: true })),
  },
};

export const reducer = (state: types.State = initialState, action: types.Actions): types.State => {
  switch (action.type) {
    case constants.OPEN_KARUTAS_FILTER_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          open: true,
        },
      };
    case constants.CLOSE_KARUTAS_FILTER_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          open: false,
        },
      };
    case constants.TOGGLE_KARUTAS_COLOR_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          colors: state.karutasFilter.colors.map(color => {
            return color.color === action.payload.color ? action.payload : color;
          }),
        },
      };
    case constants.TOGGLE_KARUTAS_KIMARIJI_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          kimarijis: state.karutasFilter.kimarijis.map(kimariji => {
            return kimariji.kimariji === action.payload.kimariji ? action.payload : kimariji;
          }),
        },
      };
    default:
      return state;
  }
};
