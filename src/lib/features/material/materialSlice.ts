import type { PayloadAction } from '@reduxjs/toolkit';
import type { Color, Karuta, KarutaNo, Kimariji } from '@/domains/models';

import { createSelector } from '@reduxjs/toolkit';
import { createAppSlice } from 'lib/createAppSlice';
import { COLOR_LIST } from '@/domains/models/Color';
import { KIMARIJI_LIST } from '@/domains/models/Kimariji';

import { KARUTA_LIST } from '@/assets/karuta';

export interface MaterialSliceState {
  karutasFilter: {
    isOpened: boolean;
    colorList: ReadonlyArray<{ color: Color; checked: boolean }>;
    kimarijiList: ReadonlyArray<{ kimariji: Kimariji; checked: boolean }>;
  };
  karutaData: Readonly<{
    byNo: Readonly<{ [no: KarutaNo]: Karuta }>;
    allNoList: ReadonlyArray<KarutaNo>;
  }>;
}

const initialState: MaterialSliceState = {
  karutasFilter: {
    isOpened: false,
    colorList: COLOR_LIST.map((color) => ({ color, checked: true })),
    kimarijiList: KIMARIJI_LIST.map((kimariji) => ({ kimariji, checked: true })),
  },
  karutaData: {
    byNo: KARUTA_LIST.reduce((prev, current) => ({ ...prev, [current.no]: current }), {}),
    allNoList: KARUTA_LIST.map((karuta) => karuta.no),
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
    selectAllKarutaNoList: (state) => state.karutaData.allNoList,
    selectFilteredKarutaNoList: createSelector(
      (state: MaterialSliceState) => state.karutasFilter,
      (state: MaterialSliceState) => state.karutaData,
      (karutasFilter, karutaData) => {
        const colorSet = new Set<Color>(
          karutasFilter.colorList.filter(({ checked }) => checked).map(({ color }) => color)
        );
        const kimarijiSet = new Set<Kimariji>(
          karutasFilter.kimarijiList.filter(({ checked }) => checked).map(({ kimariji }) => kimariji)
        );
        return karutaData.allNoList.filter((no) => {
          const karuta = karutaData.byNo[no];
          return colorSet.has(karuta.color) && kimarijiSet.has(karuta.kimariji);
        });
      }
    ),
    selectKarutaByNo: (state: MaterialSliceState, karutaNo: KarutaNo) => state.karutaData.byNo[karutaNo],
  },
});

export const { openFilter, closeFilter, toggleKarutasColor, toggleKarutasKimariji } = materialSlice.actions;

export const { selectFilter, selectAllKarutaNoList, selectFilteredKarutaNoList, selectKarutaByNo } =
  materialSlice.selectors;
