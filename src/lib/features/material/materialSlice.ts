import type { PayloadAction } from '@reduxjs/toolkit';
import type { Color, Kimariji } from '@/domains/models';

import { createSelector } from '@reduxjs/toolkit';
import { createAppSlice } from 'lib/createAppSlice';
import { COLOR_LIST } from '@/domains/models/Color';
import { KIMARIJI_LIST } from '@/domains/models/Kimariji';
import { KARUTA_NO_MAX, KARUTA_NO_MIN } from '@/domains/models/KarutaNo';
import { karutaRepository } from '@/domains/repositories';

export interface MaterialSliceState {
  karutasFilter: {
    isOpened: boolean;
    colorList: ReadonlyArray<{ color: Color; checked: boolean }>;
    kimarijiList: ReadonlyArray<{ kimariji: Kimariji; checked: boolean }>;
  };
}

const initialState: MaterialSliceState = {
  karutasFilter: {
    isOpened: false,
    colorList: COLOR_LIST.map((color) => ({ color, checked: true })),
    kimarijiList: KIMARIJI_LIST.map((kimariji) => ({ kimariji, checked: true })),
  },
};

export const materialSlice = createAppSlice({
  name: 'material',
  initialState,
  reducers: (create) => ({
    openFilter: create.reducer((state) => {
      state.karutasFilter.isOpened = true;
    }),
    closeFilter: create.reducer((state) => {
      state.karutasFilter.isOpened = false;
    }),
    toggleKarutasColor: create.reducer((state, action: PayloadAction<{ color: Color; checked: boolean }>) => {
      state.karutasFilter.colorList.find(({ color }) => color === action.payload.color)!.checked =
        action.payload.checked;
    }),
    toggleKarutasKimariji: create.reducer((state, action: PayloadAction<{ kimariji: Kimariji; checked: boolean }>) => {
      state.karutasFilter.kimarijiList.find(({ kimariji }) => kimariji === action.payload.kimariji)!.checked =
        action.payload.checked;
    }),
  }),
  selectors: {
    selectFilter: (state) => state.karutasFilter,
    selectKarutaList: createSelector(
      (state: MaterialSliceState) => state.karutasFilter,
      (karutasFilter) =>
        karutaRepository.where({
          range: { from: KARUTA_NO_MIN, to: KARUTA_NO_MAX },
          kimarijiList: karutasFilter.kimarijiList.filter((v) => v.checked).map((v) => v.kimariji),
          colorList: karutasFilter.colorList.filter((v) => v.checked).map((v) => v.color),
        })
    ),
  },
});

export const { openFilter, closeFilter, toggleKarutasColor, toggleKarutasKimariji } = materialSlice.actions;

export const { selectFilter, selectKarutaList } = materialSlice.selectors;
