import Typography from 'typography';
import { appTheme } from './theme';

const typography = new Typography({
  baseLineHeight: 1.28581,
  bodyFontFamily: ['Raleway', 'Hiragino Kaku Gothic ProN', 'Meiryo', 'sans-serif'],
  bodyWeight: 400,
  bodyColor: '#182026',
  overrideStyles: (_verticalRhythm, _options) => ({
    html: {
      fontSize: '62.5%',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    body: {
      fontSize: appTheme.fontSizeS,
      textAlign: 'center',
      textTransform: 'none',
      letterSpacing: 0,
    },
    p: {
      margin: 0,
    },
    ul: {
      margin: 0,
    },
    li: {
      listStyle: 'none',
    },
    small: {
      fontSize: appTheme.fontSizeSS,
    },
    strong: {
      fontWeight: 600,
    },
    '::-moz-selection': {
      background: 'rgba(125, 188, 255, 0.6)',
    },
    '::selection': {
      background: 'rgba(125, 188, 255, 0.6)',
    },
    a: {
      textDecoration: 'none',
      color: appTheme.fontColorLink,
    },
    'a:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: appTheme.fontColorLink,
    },
    ':focus': {
      outline: 'rgba(19, 124, 189, 0.6) auto 2px',
      outlineOffset: '2px',
      '-moz-outline-radius': '6px',
    },
  }),
});

export default typography;
