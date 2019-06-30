import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';

export type FontSize = 'sss' | 'ss' | 's' | 'm' | 'l' | 'll';

export const SPACING_UNIT = 8;

export const appTheme = {
  bottomNavHeight: '56px',
  bottomNavHeightWide: '64px',
  bottomNavWidthWide: '64px',
  colorThin: '#fffff0',
  elevationShadowHeader: '0 1px 3px rgba(0, 0, 0, 0.26)',
  elevationShadow1x: '0 1px 3px rgba(0, 0, 0, 0.26)',
  elevationShadow2x: '0 2px 6px rgba(0, 0, 0, 0.26)',
  headerHeight: '56px',
  headerHeightWide: '64px',
  minWidthWide: '768px',
  sideNavWidth: '64px',
  fontColor: {
    default: '#000',
    error: '#f00',
    light: '#fff',
    link: '#106ba3',
  },
  fontSize: {
    sss: '1rem',
    ss: '1.2rem',
    s: '1.4rem',
    m: '1.6rem',
    l: '1.8rem',
    ll: '2rem',
  },
};

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
  error: {
    light: '#ffc246',
    main: '#ff9100',
    dark: '#c56200',
    contrastText: '#fff',
  },
});

export const muiTheme = createMuiTheme({
  palette: palette,
  overrides: {
    MuiButton: {
      root: {
        padding: '5px 15px',
        fontSize: appTheme.fontSize.m,
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
      outlinedPrimary: {
        color: '#ffffff',
        backgroundColor: palette.primary.main,
        '&:active': {
          backgroundColor: palette.primary.dark,
        },
        '&:hover': {
          backgroundColor: palette.primary.dark,
        },
      },
      outlinedSecondary: {
        color: '#ffffff',
        backgroundColor: palette.secondary.main,
        '&:active': {
          backgroundColor: palette.secondary.dark,
        },
        '&:hover': {
          backgroundColor: palette.secondary.dark,
        },
      },
    },
  },
  props: {
    MuiButton: {
      variant: `outlined`,
    },
  },
});

export const theme = { ...appTheme, ...muiTheme, spacingByPx: (level: number) => `${muiTheme.spacing(level)}px` };

export type ThemeInterface = typeof theme;
