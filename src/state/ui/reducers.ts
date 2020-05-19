import * as types from './types';
import * as constants from './constants';
import { Color, Kimariji } from '@src/domain/models';

export const initialState: types.State = {
  karutasFilter: {
    open: false,
    colors: Color.values.map((color) => ({ color, checked: true })),
    kimarijis: Kimariji.values.map((kimariji) => ({ kimariji, checked: true })),
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
          colors: state.karutasFilter.colors.map((color) => {
            return color.color === action.payload.color ? action.payload : color;
          }),
        },
      };
    case constants.TOGGLE_KARUTAS_KIMARIJI_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          kimarijis: state.karutasFilter.kimarijis.map((kimariji) => {
            return kimariji.kimariji === action.payload.kimariji ? action.payload : kimariji;
          }),
        },
      };
    default:
      return state;
  }
};
