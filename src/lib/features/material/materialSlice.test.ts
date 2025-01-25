import { configureStore } from '@reduxjs/toolkit';
import {
  materialSlice,
  openFilter,
  closeFilter,
  toggleKarutasColor,
  toggleKarutasKimariji,
  MaterialSliceState,
} from './materialSlice';

describe('lib/features/material/materialSlice', () => {
  let store: ReturnType<typeof configureStore<MaterialSliceState>>;
  beforeEach(() => {
    store = configureStore({ reducer: materialSlice.reducer });
  });

  describe('reducers', () => {
    test('should be able to toggle filter opened', () => {
      store.dispatch(openFilter());
      expect(store.getState().karutasFilter.isOpened).toBeTruthy();
      store.dispatch(closeFilter());
      expect(store.getState().karutasFilter.isOpened).toBeFalsy();
    });

    test('should be able to update color condition', () => {
      store.dispatch(toggleKarutasColor({ color: 'blue', checked: false }));
      expect(store.getState().karutasFilter.colorList).toEqual([
        { color: 'blue', checked: false },
        { color: 'pink', checked: true },
        { color: 'yellow', checked: true },
        { color: 'green', checked: true },
        { color: 'orange', checked: true },
      ]);
      store.dispatch(toggleKarutasColor({ color: 'blue', checked: true }));
      expect(store.getState().karutasFilter.colorList).toEqual([
        { color: 'blue', checked: true },
        { color: 'pink', checked: true },
        { color: 'yellow', checked: true },
        { color: 'green', checked: true },
        { color: 'orange', checked: true },
      ]);
    });

    test('should be able to update kimariji condition', () => {
      store.dispatch(toggleKarutasKimariji({ kimariji: 1, checked: false }));
      expect(store.getState().karutasFilter.kimarijiList).toEqual([
        { kimariji: 1, checked: false },
        { kimariji: 2, checked: true },
        { kimariji: 3, checked: true },
        { kimariji: 4, checked: true },
        { kimariji: 5, checked: true },
        { kimariji: 6, checked: true },
      ]);
      store.dispatch(toggleKarutasKimariji({ kimariji: 1, checked: true }));
      expect(store.getState().karutasFilter.kimarijiList).toEqual([
        { kimariji: 1, checked: true },
        { kimariji: 2, checked: true },
        { kimariji: 3, checked: true },
        { kimariji: 4, checked: true },
        { kimariji: 5, checked: true },
        { kimariji: 6, checked: true },
      ]);
    });
  });
});
