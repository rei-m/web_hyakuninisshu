import {
  CLOSE_KARUTAS_FILTER_NAME,
  OPEN_KARUTAS_FILTER_NAME,
  TOGGLE_KARUTAS_COLOR_NAME,
  TOGGLE_KARUTAS_KIMARIJI_NAME,
  UiActions,
} from '@src/actions/ui';
import { Color, Kimariji } from '@src/types';

export interface UiState {
  readonly karutasFilter: {
    readonly open: boolean;
    readonly colors: Array<{ color: Color; checked: boolean }>;
    readonly kimarijis: Array<{ kimariji: Kimariji; checked: boolean }>;
  };
}

const colors: Color[] = ['blue', 'pink', 'yellow', 'green', 'orange'];
const kimarijis: Kimariji[] = [1, 2, 3, 4, 5, 6];

export const initialState: UiState = {
  karutasFilter: {
    open: false,
    colors: colors.map(color => ({ color, checked: true })),
    kimarijis: kimarijis.map(kimariji => ({ kimariji, checked: true })),
  },
};

export const ui = (state: UiState = initialState, action: UiActions): UiState => {
  switch (action.type) {
    case OPEN_KARUTAS_FILTER_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          open: true,
        },
      };
    case CLOSE_KARUTAS_FILTER_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          open: false,
        },
      };
    case TOGGLE_KARUTAS_COLOR_NAME:
      return {
        karutasFilter: {
          ...state.karutasFilter,
          colors: state.karutasFilter.colors.map(color => {
            return color.color === action.payload.color ? action.payload : color;
          }),
        },
      };
    case TOGGLE_KARUTAS_KIMARIJI_NAME:
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
