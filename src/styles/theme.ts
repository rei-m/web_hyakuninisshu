import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const SPACING_UNIT = 8;

export const appTheme = {
  bottomNavHeight: '56px',
  bottomNavHeightWide: '64px',
  bottomNavWidthWide: '64px',
  colorAccent: '#ff9100',
  colorAccentActive: '#8b550f',
  colorAccentHover: '#b16400',
  colorPrimary: '#8bc34a',
  colorPrimaryDark: '#689F38',
  colorThin: '#fffff0',
  elevationShadowHeader: '0 1px 3px rgba(0, 0, 0, 0.26)',
  elevationShadow1x: '0 1px 3px rgba(0, 0, 0, 0.26)',
  elevationShadow2x: '0 2px 6px rgba(0, 0, 0, 0.26)',
  headerHeight: '56px',
  headerHeightWide: '64px',
  minWidthWide: '768px',
  sideNavWidth: '64px',
  spacing0_5x: `${SPACING_UNIT * 0.5}px`,
  spacing1x: `${SPACING_UNIT}px`,
  spacing2x: `${SPACING_UNIT * 2}px`,
  spacing3x: `${SPACING_UNIT * 3}px`,
  spacing4x: `${SPACING_UNIT * 4}px`,
  fontSizeSSS: '1rem',
  fontSizeSS: '1.2rem',
  fontSizeS: '1.4rem',
  fontSizeM: '1.6rem',
  fontSizeL: '1.8rem',
  fontSizeLL: '2rem',
  fontColorDefault: '#000',
  fontColorLight: '#fff',
  fontColorError: '#f00',
  fontColorLink: '#106ba3',
  centering: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

export const muiTheme: ThemeOptions = {
  palette: {
    primary: { main: appTheme.colorPrimary },
    secondary: { main: appTheme.colorPrimaryDark },
    background: {
      default: appTheme.colorThin,
    },
  },
  typography: {
    useNextVariants: true,
  },
};

export type ThemeInterface = typeof appTheme;
