'use client';

import type { SxProps, Theme } from '@mui/material/styles';

import createTheme from '@mui/material/styles/createTheme';
import createPalette from '@mui/material/styles/createPalette';

const palette = createPalette({
  primary: {
    light: '#bef67a',
    main: '#8bc34a',
    dark: '#5a9216',
    contrastText: '#232323',
  },
  secondary: {
    light: '#ffc246',
    main: '#ff9100',
    dark: '#c56200',
    contrastText: '#fff',
  },
  background: {
    default: '#fffff0',
  },
});

export const FONT_SIZE = {
  sss: '1rem',
  ss: '1.2rem',
  s: '1.4rem',
  m: '1.6rem',
  l: '1.8rem',
  ll: '2rem',
} as const;

export type FontSize = keyof typeof FONT_SIZE;

export const WIDTH_MIN_WIDE = '768px';
export const WIDTH_SIDE_NAV = '64px';
export const WIDTH_BOTTOM_NAV_WIDH = '64px';
export const HEIGHT_HEADER = '56px';
export const HEIGHT_HEADER_WIDE = '64px';
export const HEIGHT_BOTTOM_NAV = '56px';
export const HEIGHT_BOTTOM_NAV_WIDE = '64px';

export const theme = createTheme({
  palette: palette,
  typography: {
    fontFamily: 'var(--font-notsans)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '62.5%',
          color: 'rgb(0, 0, 0)',
          backgroundColor: palette.background.default,
        },
        a: {
          color: '#106ba3',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: FONT_SIZE.s,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: FONT_SIZE.m,
        },
        outlined: {
          backgroundColor: palette.grey[100],
          '&:active': {
            backgroundColor: palette.grey[200],
          },
          '&:hover': {
            backgroundColor: palette.grey[200],
          },
        },
      },
      defaultProps: {
        variant: `contained`,
      },
    },
  },
});

export type SxAppProps = SxProps<Theme>;
